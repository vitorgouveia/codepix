import { Publish, kafka } from "./producer.js"

import { TransactionDTO } from "../dto/transaction.js"
import { TransactionUseCaseFactory } from "../factory/factory.js"
import { Status } from "../../domain/model/transaction.js"

export class KafkaProcessor {
  database
  producer
  
  constructor(database, producer) {
    this.database = database
    this.producer = producer
  }

  static NewKafkaProcessor(database, producer) {
    return new KafkaProcessor(database, producer)
  }

  async Consume() {
    const consumer = kafka.consumer({
      groupId: process.env.KAFKA_CONSUMER_GROUP,
      allowAutoTopicCreation: true
    })

    try {
      await consumer.connect()
    } catch(error) {
      console.log("Failed to connect consumer!")
      return [null, error]
    }

    const topics = [
      process.env.KAFKA_TRANSACTIONS_TOPIC,
      process.env.KAFKA_TRANSACTION_CONFIRMATION_TOPIC
    ]

    try {
      await consumer.subscribe({
        topics,
        fromBeginning: true
      })
    } catch(error) {
      console.log("Failed to subscribe consumer!")
      return [null, error]
    }

    console.log("Kafka consumer has been started")

    try {
      await consumer.run({
        eachMessage: async ({ message, topic }) => {
          await this.#processMessage(topic, message)
        }
      })
    } catch(error) {
      console.log("Failed to consume message")
      return [null, error]
    }

    return [null, null]
  }

  async #processMessage(topic, message) {
    const Topics = {
      Transaction: process.env.KAFKA_TRANSACTIONS_TOPIC,
      TransactionConfirmation: process.env.KAFKA_TRANSACTION_CONFIRMATION_TOPIC,
    }

    if(topic === Topics.Transaction) {
      const error = await this.#processTransaction(message)
  
      if(error) {
        console.log(error)
      }
    } else if (topic === Topics.TransactionConfirmation) {
      const error = await this.#processTransactionConfirmation(message)

      if(error) {
        console.log(error)
      }
    } else {
      console.log(`Topic: ${topic} is not a valid topic! Message: ${message.value}`)
    }
  }

  async #processTransaction(message) {
    const [transaction, parseError] = TransactionDTO.ParseJSON(message.value)

    if(parseError !== null) {
      return parseError
    }

    const transactionUseCase = TransactionUseCaseFactory()

    const [registeredTransaction, error] = await transactionUseCase.Register(
      transaction.accountId,
      transaction.amount,
      transaction.pixKeyTo,
      transaction.pixKeyKindTo,
      transaction.description,
    )

    if(error !== null) {
      console.log("Error registering transaction")
      return error
    }

    const bankCode = registeredTransaction.pixKeyTo.account.bank.code
    const topic = `bank${bankCode}`

    transaction.id = registeredTransaction.id
    transaction.status = Status.Pending

    const [transactionJSON, serializeError] = TransactionDTO.Serialize(transaction)

    if(serializeError !== null) {
      return serializeError
    }

    const kafkaErr = await Publish(transactionJSON, topic, this.producer)

    if(kafkaErr !== null) {
      return kafkaErr
    }

    return null
  }

  async #processTransactionConfirmation(message) {
    const [transaction, parseError] = TransactionDTO.ParseJSON(message.value)

    if(parseError !== null) {
      return parseError
    }

    const transactionUseCase = TransactionUseCaseFactory()
    
    if(transaction.status === Status.Confirmed) {
      const [confirmedTransaction, error] = await transactionUseCase.Confirm(transactionUseCase.id)

      if(error !== null) {
        console.log("Error on confirmed transaction")
        return error
      }

      const code = confirmedTransaction.accountFrom.bank.code
      const topic = `bank${code}`

      const [transactionJSON, serializeError] = TransactionDTO.Serialize(confirmedTransaction)

      if(serializeError !== null) {
        return serializeError
      }
  
      await Publish(transactionJSON, topic, this.producer)
    } else if (transaction.status === Status.Completed) {
      const [_, error] = await transactionUseCase.Complete(transactionUseCase.id)

      if(error !== null) {
        return error
      }
      
      return null
    }

    return null
  }
}