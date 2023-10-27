import * as commander from "commander"

import * as grpc from "../application/grpc/server.js"
import * as db from "../infra/db/db.js"

export const grpcCommand = new commander.Command()
  .command("grpc")
  .description("Start gRPC server.")
  .option("-p, --port <number>", "Server port.", 50051)
  .action((props) => {
    const port = Number(props.port)

    if(isNaN(port)) {
      commander.program.error("Port has to be a number.")
    }

    const database = db.DB.connectDB(process.env.NODE_ENV)
    grpc.StartGrpcServer(database, port)
  })