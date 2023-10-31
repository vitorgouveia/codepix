import worker_threads from "node:worker_threads"

import { KafkaProcessor } from "../application/kafka/process.js"
import { NewKafkaProducer, Publish } from "../application/kafka/producer.js"
import { database } from "../app.js"

const [producer, error] = await NewKafkaProducer()

if(error !== null) {
  worker_threads.parentPort.postMessage("Failed to connect!")
  process.exit(1)
}

worker_threads.parentPort.postMessage("Producer connected!")

// setInterval(async () => {
//   const error = await Publish("Olá Kafka", "transactions", producer)

//   if(error !== null) {
//     console.log(error)
//     return
//   }
// }, 500)

const kafkaProcessor = KafkaProcessor.NewKafkaProcessor(database, producer)

worker_threads.parentPort.postMessage("Consumer Connected!")
const [_, consumerError] = await kafkaProcessor.Consume()

if(consumerError !== null) {
  worker_threads.parentPort.postMessage("Consumer Failed!")
}

worker_threads.parentPort.postMessage("started")