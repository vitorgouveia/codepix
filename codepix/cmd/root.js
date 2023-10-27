import dotenv from "dotenv"
import * as commander from "commander"

import packageJson from "../package.json" assert {
  type: "json"
}

import { grpcCommand } from "./grpc.js"
import { kafkaCommand } from "./kafka.js"

const { error } = dotenv.config()

if(error !== undefined) {
  console.error(error)
  throw new Error("Failed while loading .env")
}

export function Execute() {
  const program = new commander.Command();

  program
    .name("Codepix")
    .description("Codepix software to intermediate monetary transactions.")
    .version(packageJson.version)
  
  program.addCommand(grpcCommand)
  program.addCommand(kafkaCommand)

  program.parse()
}