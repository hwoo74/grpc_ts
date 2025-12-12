import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'; // 유니버설 RPC 타입. 입력과 출력은 항상 이걸 써야 함. 
import * as messages from '../../generated/grpc_mysql_pb'; // 메시지 정의 (Id, UserName, AllUser 등)
import { Empty } from 'google-protobuf/google/protobuf/empty_pb'; // google.protobuf.Empty 메시지 사용, 널값 대신
import { PoolConnection } from 'mysql2/promise';

import UserModel from '../model/userModel';

/**
 * GetUser (단방향 RPC): Id를 받아 UserName을 반환
 */
export const myGetUser = (
    call: ServerUnaryCall<messages.Id, messages.UserName>,
    callback: sendUnaryData<messages.UserName>
): void => {
    const userId = call.request.getId();
    console.log(`[App] GetUser 요청 받음: ID = ${userId}`);

    const userName = new messages.UserName();
    userName.setName(`User_${userId}`);

    callback(null, userName);
};

/**
 * SetUser (단방향 RPC): UserName을 받아 Id를 반환
 */
export const mySetUser = (
    call: ServerUnaryCall<messages.UserName, messages.Id>,
    callback: sendUnaryData<messages.Id>
): void => {
    const user = call.request;
    console.log(`[App] SetUser 요청 받음: Name = ${user.getName()}`);

    const id = new messages.Id();
    id.setId(Math.floor(Math.random() * 1000));

    callback(null, id);
}

/**
 * GetAllUser (단방향 RPC): Empty 요청을 받아 AllUser 리스트를 반환
 */
export const myGetAllUserOrg = (
    call: ServerUnaryCall<Empty, messages.AllUser>,
    callback: sendUnaryData<messages.AllUser>
): void => {
    console.log(`[App] GetAllUser 요청 받음`);

    const allUser = new messages.AllUser();

    for (let i = 1; i <= 5; i++) {
        const user = new messages.UserName();
        user.setName(`User_${i}`);
        allUser.addUsers(user);
    }

    callback(null, allUser);
}

export const myGetAllUser = async (
    connection: PoolConnection,
    call: ServerUnaryCall<Empty, messages.AllUser>,
    callback: sendUnaryData<messages.AllUser>
): Promise<void> => {
    console.log(`[App] GetAllUser 요청 받음`);

    const userModel = new UserModel(connection);
    const users = await userModel.getAllUsers(); // 동기 메서드 사용 예시
    console.log(users);

    const allUser = new messages.AllUser(); // gRPC 에서 정의된 함수 사용.

    for (let i = 0; i < users.length; i++) {
        const user = new messages.UserName(); // gRPC 에서 정의된 함수 사용.

        user.setName(users[i] as string); // gRPC 에서 정의된 함수 사용.
        allUser.addUsers(user); // gRPC 에서 정의된 함수 사용.
    }

    /*
    for (let i = 1; i <= 5; i++) {
        const user = new messages.UserName();
        user.setName(`User_${i}`);
        allUser.addUsers(user);
    }
    */

    callback(null, allUser);
}

// 구현체는 여기서 export 하지 않고 route.ts에서 묶어줍니다. 
// 필요한 경우, 모듈의 타입만 여기서 export할 수 있습니다.