import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "./protos/user.proto";

//https://medium.com/@arturocuicas/fastapi-and-grpc-19c9b329b211

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const userProto = grpc.loadPackageDefinition(packageDefinition);

const client = new userProto.user.UserService("localhost:10001", grpc.credentials.createInsecure());

module.exports = client;
