// package: routeguide
// file: grpc_mysql.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as grpc_mysql_pb from "./grpc_mysql_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IRouteGuideService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUser: IRouteGuideService_IGetUser;
    setUser: IRouteGuideService_ISetUser;
    getAllUser: IRouteGuideService_IGetAllUser;
}

interface IRouteGuideService_IGetUser extends grpc.MethodDefinition<grpc_mysql_pb.Id, grpc_mysql_pb.UserName> {
    path: "/routeguide.RouteGuide/GetUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<grpc_mysql_pb.Id>;
    requestDeserialize: grpc.deserialize<grpc_mysql_pb.Id>;
    responseSerialize: grpc.serialize<grpc_mysql_pb.UserName>;
    responseDeserialize: grpc.deserialize<grpc_mysql_pb.UserName>;
}
interface IRouteGuideService_ISetUser extends grpc.MethodDefinition<grpc_mysql_pb.UserName, grpc_mysql_pb.Id> {
    path: "/routeguide.RouteGuide/SetUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<grpc_mysql_pb.UserName>;
    requestDeserialize: grpc.deserialize<grpc_mysql_pb.UserName>;
    responseSerialize: grpc.serialize<grpc_mysql_pb.Id>;
    responseDeserialize: grpc.deserialize<grpc_mysql_pb.Id>;
}
interface IRouteGuideService_IGetAllUser extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, grpc_mysql_pb.AllUser> {
    path: "/routeguide.RouteGuide/GetAllUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<grpc_mysql_pb.AllUser>;
    responseDeserialize: grpc.deserialize<grpc_mysql_pb.AllUser>;
}

export const RouteGuideService: IRouteGuideService;

export interface IRouteGuideServer extends grpc.UntypedServiceImplementation {
    getUser: grpc.handleUnaryCall<grpc_mysql_pb.Id, grpc_mysql_pb.UserName>;
    setUser: grpc.handleUnaryCall<grpc_mysql_pb.UserName, grpc_mysql_pb.Id>;
    getAllUser: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, grpc_mysql_pb.AllUser>;
}

export interface IRouteGuideClient {
    getUser(request: grpc_mysql_pb.Id, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.UserName) => void): grpc.ClientUnaryCall;
    getUser(request: grpc_mysql_pb.Id, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.UserName) => void): grpc.ClientUnaryCall;
    getUser(request: grpc_mysql_pb.Id, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.UserName) => void): grpc.ClientUnaryCall;
    setUser(request: grpc_mysql_pb.UserName, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.Id) => void): grpc.ClientUnaryCall;
    setUser(request: grpc_mysql_pb.UserName, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.Id) => void): grpc.ClientUnaryCall;
    setUser(request: grpc_mysql_pb.UserName, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.Id) => void): grpc.ClientUnaryCall;
    getAllUser(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.AllUser) => void): grpc.ClientUnaryCall;
    getAllUser(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.AllUser) => void): grpc.ClientUnaryCall;
    getAllUser(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.AllUser) => void): grpc.ClientUnaryCall;
}

export class RouteGuideClient extends grpc.Client implements IRouteGuideClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getUser(request: grpc_mysql_pb.Id, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.UserName) => void): grpc.ClientUnaryCall;
    public getUser(request: grpc_mysql_pb.Id, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.UserName) => void): grpc.ClientUnaryCall;
    public getUser(request: grpc_mysql_pb.Id, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.UserName) => void): grpc.ClientUnaryCall;
    public setUser(request: grpc_mysql_pb.UserName, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.Id) => void): grpc.ClientUnaryCall;
    public setUser(request: grpc_mysql_pb.UserName, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.Id) => void): grpc.ClientUnaryCall;
    public setUser(request: grpc_mysql_pb.UserName, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.Id) => void): grpc.ClientUnaryCall;
    public getAllUser(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.AllUser) => void): grpc.ClientUnaryCall;
    public getAllUser(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.AllUser) => void): grpc.ClientUnaryCall;
    public getAllUser(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: grpc_mysql_pb.AllUser) => void): grpc.ClientUnaryCall;
}
