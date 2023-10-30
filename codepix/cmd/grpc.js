import * as commander from "commander"

import * as grpc from "../application/grpc/server.js"
import { database } from "../app.js"

export const grpcCommand = new commander.Command()
  .command("grpc")
  .description("Start gRPC server.")
  .option("-p, --port <number>", "Server port.", 50051)
  .action((props) => {
    const port = Number(props.port)

    if(isNaN(port)) {
      commander.program.error("Port has to be a number.")
    }

    grpc.StartGrpcServer(database, port)
  })