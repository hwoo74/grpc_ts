// package: routeguide
// file: grpc_mysql.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Id extends jspb.Message { 
    getId(): number;
    setId(value: number): Id;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Id.AsObject;
    static toObject(includeInstance: boolean, msg: Id): Id.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Id, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Id;
    static deserializeBinaryFromReader(message: Id, reader: jspb.BinaryReader): Id;
}

export namespace Id {
    export type AsObject = {
        id: number,
    }
}

export class UserName extends jspb.Message { 
    getName(): string;
    setName(value: string): UserName;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserName.AsObject;
    static toObject(includeInstance: boolean, msg: UserName): UserName.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserName, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserName;
    static deserializeBinaryFromReader(message: UserName, reader: jspb.BinaryReader): UserName;
}

export namespace UserName {
    export type AsObject = {
        name: string,
    }
}

export class AllUser extends jspb.Message { 
    clearUsersList(): void;
    getUsersList(): Array<UserName>;
    setUsersList(value: Array<UserName>): AllUser;
    addUsers(value?: UserName, index?: number): UserName;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AllUser.AsObject;
    static toObject(includeInstance: boolean, msg: AllUser): AllUser.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AllUser, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AllUser;
    static deserializeBinaryFromReader(message: AllUser, reader: jspb.BinaryReader): AllUser;
}

export namespace AllUser {
    export type AsObject = {
        usersList: Array<UserName.AsObject>,
    }
}
