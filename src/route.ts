import { RouteGuideService, IRouteGuideServer } from '../generated/grpc_mysql_grpc_pb'; // RouteGuideService (서비스 인터페이스), IRouteGuideServer (타입 정의)
import { UntypedServiceImplementation, ServiceDefinition } from '@grpc/grpc-js';
import { myGetAllUser, myGetUser, mySetUser } from './application/user'; // 구현 함수 Import
import { useDbConnection } from './interceptor/dbConnectionInterceptor';

// 1. IRouteGuideServer 타입에 맞는 구현체 객체를 생성합니다.
const serverImplementation: IRouteGuideServer = {
    // RPC 메서드 이름 (소문자 카멜 케이스)과 구현 함수를 연결. 
    // proto 파일의 rpc 이름과 일치해야 합니다. 
    // 대소문자 차이 주의 !! (node grpc-js 규칙)
    getUser: useDbConnection(myGetUser),
    setUser: mySetUser,
    getAllUser: useDbConnection(myGetAllUser)   // 인터셉터로 래핑된 함수 사용, 이경우 파라미터 값은 useDbConnection 형식에 맞출것. (파라미터 3개)
};

/**
 * gRPC 서버에 등록할 서비스 정의와 구현체를 반환하는 함수
 * @returns {ServiceDefinition, UntypedServiceImplementation} 등록할 서비스 정보
 */
export const getServiceRegistration = (): { 
    definition: ServiceDefinition<any>, 
    implementation: UntypedServiceImplementation 
} => {
    
    // 2. 서비스 정의와 구현체를 묶어서 반환합니다.
    return {
        definition: RouteGuideService, // 서비스 정의 (값)
        implementation: serverImplementation as UntypedServiceImplementation // 구현체 (값)
    };
};