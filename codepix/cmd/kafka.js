import * as commander from "commander"

import { NewKafkaProducer, Publish } from "../application/kafka/producer.js"
import { KafkaProcessor } from "../application/kafka/process.js"
import { database } from "../app.js"

export const kafkaCommand = new commander.Command()
  .command("kafka")
  .description("Start consuming transactions using Apache Kafka.")
  .action(async () => {
    const [producer, error] = await NewKafkaProducer()

    if(error !== null) {
      commander.program.error("Failed to connect to kafka!")
    }
    console.log("connected!")

    setInterval(async () => {
      await Publish("Olá Kafka", "transactions", producer)
    }, 500)

    const kafkaProcessor = KafkaProcessor.NewKafkaProcessor(database, producer)

    console.log("Consuming messages!")
    await kafkaProcessor.Consume()
  })