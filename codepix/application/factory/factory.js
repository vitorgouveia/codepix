import { PixKeyRepository } from "../../infra/repository/pix.js"
import { TransactionRepository } from "../../infra/repository/transaction.js"
import { TransactionUseCase } from "../usecase/transaction.js"
import { database } from "../../app.js"

export function TransactionUseCaseFactory() {
  const pixRepository = new PixKeyRepository(database)
  const transactionRepository = new TransactionRepository(database)

  const transactionUseCase = new TransactionUseCase(transactionRepository, pixRepository)

  return transactionUseCase
}