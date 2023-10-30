import worker from "node:worker_threads"
import path from "node:path"
import url from "node:url"

import * as commander from "commander"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const workersDir = path.join(__dirname, "..", "./workers")

export const allCommand = new commander.Command()
  .command("all")
  .description("Start gRPC and Kafka.")
  .option("-p, --port <number>", "gRPC port.", 50051)
  .action(async (props) => {
    const port = Number(props.port)
    
    if(isNaN(port)) {
      commander.program.error("Port has to be a number.")
    }

    const grpcWorker = new worker.Worker(`${workersDir}/grpc.js`, {
      workerData: {
        port: props.port
      }
    })
    grpcWorker.on("message", message => {
      console.log(`[grpc]: ${message}`)
    })

    const kafkaWorker = new worker.Worker(`${workersDir}/kafka.js`)
    kafkaWorker.on("message", message => {
      console.log(`[kafka]: ${message}`)
    })
  })