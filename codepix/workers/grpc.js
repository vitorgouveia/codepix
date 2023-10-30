import worker_threads from "node:worker_threads"

import * as grpc from "../application/grpc/server.js"
import { database } from "../app.js"

const port = worker_threads.workerData.port

worker_threads.parentPort.postMessage("starting")

grpc.StartGrpcServer(database, port)