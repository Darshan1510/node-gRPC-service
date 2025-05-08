# Node.js gRPC User Service

This project demonstrates a basic gRPC service in Node.js for managing user-related operations such as registration, login, updates, deletions, and retrievals. It uses Protocol Buffers (proto3) to define the service and messages.

## Features

* Register a new user
* Login a user
* Retrieve a user by ID
* Update user details
* Delete a user
* List users

## Folder Structure

```plaintext
node-gRPC-service/
├── protos/
│   └── user.proto           # gRPC service and message definitions
├── client.js                # Sample gRPC client
├── server.js                # gRPC server implementation
├── package.json             # Node.js dependencies and metadata
└── README.md
```

## Prerequisites

* Node.js (>= v12)
* `protoc` compiler (Protocol Buffers) installed
* `grpc-tools` and `@grpc/proto-loader` packages

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Darshan1510/node-gRPC-service.git
   cd node-gRPC-service
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

## Running the Server

Start the gRPC server using:

```bash
node server.js
```

This starts the server and listens for gRPC requests defined in `user.proto`.

## Running the Client

In another terminal window:

```bash
node client.js
```

This client script demonstrates how to call the user service methods like `RegisterUser`, `LoginUser`, etc.

## Proto Definitions (`user.proto`)

The `UserService` includes the following RPC methods:

* `GetUser`
* `RegisterUser`
* `UpdateUser`
* `DeleteUser`
* `ListUsers`
* `LoginUser`

Each method uses request and response messages containing user attributes such as `id`, `name`, `email`, `phone`, `password`, and timestamps.

## License

This project is licensed under the MIT License.