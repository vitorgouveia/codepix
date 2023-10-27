import path from "node:path"
import url from "node:url"

import grpc from "@grpc/grpc-js"
import protoloader from "@grpc/proto-loader"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const PROTO_PATH = `${__dirname}/protofiles/pix-key.proto`

const protofile = await protoloader.load(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const packageDefinition = grpc.loadPackageDefinition(protofile)

import { PixKeyRepository } from "../../infra/repository/pix.js"
import { PixUseCase } from "../usecase/pix.js"
import { PixService } from "./pix.js"

const serviceAdapter = (applicationService) => async (call, callback) => {
  const [contract, error] = await applicationService(call)

  callback(error, contract)
}

export function StartGrpcServer(database, port) {
  const server = new grpc.Server()

  const pixkey = packageDefinition.pixkey

  const pixRepository = new PixKeyRepository(database)
  const pixUseCase = new PixUseCase(pixRepository)
  const pixService = new PixService(pixUseCase)

  server.addService(pixkey.PixService.service, {
    RegisterPixKey: serviceAdapter(pixService.RegisterPixKey),
    Find: serviceAdapter(pixService.Find),
  })

  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (error) => {
    if(error !== null) {
      console.log("Cannot start gRPC server")
      console.error(error)
      process.exit(1)
    }
    
    server.start()
    console.log(`gRPC server has been started on 0.0.0.0:${port}`)
  })
}