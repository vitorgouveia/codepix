import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: 'codepix',
  brokers: ['kafka:9092'],
})

export async function NewKafkaProducer() {
  const producer = kafka.producer()

  try {
    await producer.connect()
  } catch(error) {
    console.log("Failed to connect producer")
    return [null, error]
  }

  return [producer, null]
}

export async function Publish(message, topic, producer) {
  await producer.send({
    topic: "my-topic",
    messages: [
      { value: "Hello world!" }
    ]
  })
  
  return null
}