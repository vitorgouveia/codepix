import * as commander from "commander"

import { NewKafkaProducer, Publish } from "../application/kafka/producer.js"

export const kafkaCommand = new commander.Command()
  .command("kafka")
  .description("Start consuming transactions using Apache Kafka.")
  .action(async () => {
    const [producer, error] = await NewKafkaProducer()

    if(error !== null) {
      commander.program.error("Failed to connect to kafka!")
    }
    console.log("connected!")

    await Publish("Olá Kafka", "transactions", producer)
    console.log("Message sent!")
  })