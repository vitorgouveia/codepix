import { Kafka } from "kafkajs"

export const kafka = new Kafka({
  clientId: 'codepix',
  brokers: ['kafka:9092'],
})

export async function NewKafkaProducer() {
  const producer = kafka.producer({
    allowAutoTopicCreation: true
  })

  try {
    await producer.connect()
  } catch(error) {
    console.log("Failed to connect producer!")
    return [null, error]
  }

  return [producer, null]
}

export async function Publish(message, topic, producer) {
  try {
    await producer.send({
      topic,
      messages: [
        { value: message }
      ]
    })

    return null
  } catch(error) {
    return error
  }
}