// 필요한 타입 및 함수 임포트
import { ServerUnaryCall, sendUnaryData, ServiceError, Metadata, status } from '@grpc/grpc-js';
import { PoolConnection } from 'mysql2/promise';
import { getDbPool } from '../lib/connectionPool';

// gRPC 서비스 핸들러 함수의 타입을 정의합니다. (이 부분은 동일)
type HandlerWithConnection<RequestType, ResponseType> = (
    connection: PoolConnection,
    call: ServerUnaryCall<RequestType, ResponseType>,
    callback: sendUnaryData<ResponseType>
) => Promise<void> | void;

// ServiceError를 만족시키는 Error 객체의 타입을 정의합니다.
type CustomServiceError = Error & {
    code: status;
    details: string;
    metadata: Metadata;
};

/**
 * DB Connection Pool을 사용하여 gRPC 유니라터널 핸들러를 래핑하는 인터셉터 함수입니다.
 * 오류 발생 시 기존 Error 객체에 gRPC 속성만 추가하여 재활용합니다.
 */
// 이모냥이 되는 이유는, 
// 기존 gRPC 모듀을 실행시에 오류가 발생하더라도 바로 오류를 던질수 없음. connection 반납이 있어야 함.
// 따라서, catch 문에서 오류에 대해서 처리를 하고 finally 문에서 connection 반납후 오류 객체를 전달하기 위해, 객체를 다시 구성함.
export function useDbConnection<RequestType, ResponseType>(
    serviceHandler: HandlerWithConnection<RequestType, ResponseType>
) {
    return async (
        call: ServerUnaryCall<RequestType, ResponseType>,
        callback: sendUnaryData<ResponseType>
    ): Promise<void> => {
        let connection: PoolConnection | null = null;
        
        try {
            // 1. Connection 확보
            const pool = getDbPool();
            connection = await pool.getConnection();

            // 2. 비즈니스 로직 실행
            await serviceHandler(connection, call, callback);
            // 여기 파라미터의 전달 순서에 맞춰서 serviceHandler 가 호출됨.. 즉, connection 이 가장 먼저 옴.

        } catch (error) {
            console.error('[gRPC Interceptor] 핸들러 실행 중 오류 포착:', error);
            
            // 1. 포착된 오류를 ServiceError 규격으로 변환/재활용합니다.
            let statusToSend: CustomServiceError;

            // error가 일반적인 Error 인스턴스인 경우를 가정하고 속성을 추가합니다.
            if (error instanceof Error) {
                statusToSend = error as CustomServiceError; // 타입 단언

                // 2. gRPC 필수 속성 할당
                // 이 예시에서는 모든 포착된 오류를 INTERNAL (13)로 처리합니다.
                statusToSend.code = status.INTERNAL;
                statusToSend.details = statusToSend.message;
                statusToSend.metadata = new Metadata();

                // 💡 만약 핸들러에서 명시적으로 던져진 오류가 이미 code 속성을 가지고 있다면,
                // 이를 존중하고 INTERNAL로 덮어쓰지 않도록 보호 로직을 추가할 수 있습니다.
                // if (typeof (error as any).code !== 'number') {
                //     statusToSend.code = Status.INTERNAL;
                // }

            } else {
                // Error 인스턴스가 아닌 경우, 새로운 Error를 생성하여 래핑합니다.
                // (이 경우는 드물지만 안전을 위해 처리합니다.)
                statusToSend = new Error('An unknown, non-Error type exception occurred') as CustomServiceError;
                statusToSend.code = status.INTERNAL;
                statusToSend.details = statusToSend.message;
                statusToSend.metadata = new Metadata();
            }
            
            // 3. gRPC 표준 오류 응답 전송
            callback(statusToSend, null);

        } finally {
            // 4. Connection 반납 보장
            if (connection) {
                connection.release();
            }
        }
    };
}