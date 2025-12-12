import * as grpc from '@grpc/grpc-js';
import { Server, ServerCredentials } from '@grpc/grpc-js';
import { getServiceRegistration } from './route'; // 서비스 등록 정보 Import
import { AppConfig, ConfigManager } from './conf/envConf'; // 환경변수 설정

/**
 * gRPC 서버 초기화 및 시작
 */
function main(): void {
    // 환경 변수 로드
    const config: AppConfig = ConfigManager.getConfig();

    // gRPC 서버 인스턴스 생성
    const server: Server = new grpc.Server();
    
    // 1. route.ts에서 서비스 등록 정보를 가져옵니다.
    const serviceRegistration = getServiceRegistration();
    
    // 2. 서비스 정의와 구현을 서버에 바인딩
    server.addService(
        serviceRegistration.definition,
        serviceRegistration.implementation
    );

    const bindAddress: string = '0.0.0.0:' + config.grpcPort;

    // 서버 바인딩 및 시작
    server.bindAsync(
        bindAddress,
        ServerCredentials.createInsecure(),
        (err: Error | null, port: number) => {
            if (err) {
                console.error(`${config.nodeEnv} 서버 바인딩 실패 (${bindAddress}):`, err);
                return;
            }
            console.log(`gRPC RouteGuide (${config.nodeEnv}) 서버가 ${bindAddress}에서 실행 중입니다.`);
            // 서버는 bindAsync 성공 후 자동 시작됩니다.
        }
    );
}

main();