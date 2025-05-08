import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "./protos/user.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const userProto = grpc.loadPackageDefinition(packageDefinition);
const userPackage = userProto.user;

const server = new grpc.Server();

let users = [];

function registerUser(call, callback) {
  const data = call.request;

  const exist = users.find((user) => user.email === data.email);
  if (exist) {
    return callback({ code: grpc.status.ALREADY_EXISTS, details: "User already exists" });
  }

  const user = {
    id: new Date().getTime().toString(),
    ...data,
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  };
  users.push(user);
  callback(null, user);
}

function listUsers(call, callback) {
  callback(null, users);
}

function deleteUser(call, callback) {
  const { id } = call.request;
  users = users.filter((user) => user.id !== id);
  callback(null, id);
}

function updateUser(call, callback) {
  const data = call.request;

  const userIndex = users.findIndex((user) => user.id === data.id);

  if (!userIndex) {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "Could not find a user with the specified ID to update",
    });
  }

  const selectedUser = users[userIndex];

  const user = {
    updated_at: new Date().getTime(),
    id: data.id,
    name: data.name ?? selectedUser.name,
    email: selectedUser.email,
    phone: data.phone ?? selectedUser.phone,
    password: selectedUser.password,
  };

  users = users.map((u) => {
    if (u.id === user.id) {
      return user;
    }
    return u;
  });

  callback(null, user);
}

function getUser(call, callback) {
  const { id } = call.request;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
  }
  callback(null, user);
}

function loginUser(call, callback) {
  const { email, password } = call.request;
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
  }
  callback(null, user);
}

server.addService(userPackage.UserService.service, {
  registerUser,
  listUsers,
  deleteUser,
  updateUser,
  getUser,
  loginUser,
});

server.bindAsync("127.0.0.1:10001", grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server running at http://127.0.0.1:10001`);
});
