// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var grpc_mysql_pb = require('./grpc_mysql_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_routeguide_AllUser(arg) {
  if (!(arg instanceof grpc_mysql_pb.AllUser)) {
    throw new Error('Expected argument of type routeguide.AllUser');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_routeguide_AllUser(buffer_arg) {
  return grpc_mysql_pb.AllUser.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_routeguide_Id(arg) {
  if (!(arg instanceof grpc_mysql_pb.Id)) {
    throw new Error('Expected argument of type routeguide.Id');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_routeguide_Id(buffer_arg) {
  return grpc_mysql_pb.Id.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_routeguide_UserName(arg) {
  if (!(arg instanceof grpc_mysql_pb.UserName)) {
    throw new Error('Expected argument of type routeguide.UserName');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_routeguide_UserName(buffer_arg) {
  return grpc_mysql_pb.UserName.deserializeBinary(new Uint8Array(buffer_arg));
}


// Interface exported by the server.
//
var RouteGuideService = exports.RouteGuideService = {
  getUser: {
    path: '/routeguide.RouteGuide/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: grpc_mysql_pb.Id,
    responseType: grpc_mysql_pb.UserName,
    requestSerialize: serialize_routeguide_Id,
    requestDeserialize: deserialize_routeguide_Id,
    responseSerialize: serialize_routeguide_UserName,
    responseDeserialize: deserialize_routeguide_UserName,
  },
  setUser: {
    path: '/routeguide.RouteGuide/SetUser',
    requestStream: false,
    responseStream: false,
    requestType: grpc_mysql_pb.UserName,
    responseType: grpc_mysql_pb.Id,
    requestSerialize: serialize_routeguide_UserName,
    requestDeserialize: deserialize_routeguide_UserName,
    responseSerialize: serialize_routeguide_Id,
    responseDeserialize: deserialize_routeguide_Id,
  },
  getAllUser: {
    path: '/routeguide.RouteGuide/GetAllUser',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: grpc_mysql_pb.AllUser,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_routeguide_AllUser,
    responseDeserialize: deserialize_routeguide_AllUser,
  },
};

exports.RouteGuideClient = grpc.makeGenericClientConstructor(RouteGuideService, 'RouteGuide');
