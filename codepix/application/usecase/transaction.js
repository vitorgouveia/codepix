import { Status, Transaction } from "../../domain/model/transaction.js"

export class TransactionUseCase {
  #transactionRepository
  #pixKeyRepository
  
  constructor(transactionRepository, pixKeyRepository) {
    this.#transactionRepository = transactionRepository
    this.#pixKeyRepository = pixKeyRepository
  }

  async Register(accountId, amount, pixKeyTo, pixKeyKindTo, description) {
    const [account, accountError] = await this.#pixKeyRepository.FindAccount(accountId)
    if(accountError !== null) {
      return [null, accountError]
    }

    const [pixKey, pixKeyError] = await this.#pixKeyRepository.FindKeyByKind(pixKeyTo, pixKeyKindTo)
    if(pixKeyError !== null) {
      return [null, pixKeyError]
    }

    const [transaction, transactionError] = Transaction.New(account, amount, pixKey, description)
    if(transactionError !== null) {
      return [null, transactionError]
    }

    const saveError = await this.#transactionRepository.Save(transaction)
    if(saveError !== null) {
      return [null, saveError]
    }

    return [transaction, null]
  }

  async Confirm(transactionId) {
    const [transaction, findError] = await this.#transactionRepository.Find(transactionId)
    if(findError !== null) {
      return [null, findError]
    }

    transaction.status = Status.Confirmed

    const error = await this.#pixKeyRepository.Save(transaction)
    if(error !== null) {
      return [null, error]
    }

    return [transaction, null]
  }

  async Complete(transactionId) {
    const [transaction, findError] = await this.#transactionRepository.Find(transactionId)
    if(findError !== null) {
      return [null, findError]
    }

    transaction.status = Status.Completed

    const error = await this.#pixKeyRepository.Save(transaction)
    if(error !== null) {
      return [null, error]
    }

    return [transaction, null]
  }

  async Error(transactionId, reason) {
    const [transaction, findError] = await this.#transactionRepository.Find(transactionId)
    if(findError !== null) {
      return [null, findError]
    }

    transaction.status = Status.Error
    transaction.cancelDescription = reason
    
    const error = await this.#pixKeyRepository.Save(transaction)
    if(error !== null) {
      return [null, error]
    }

    return [transaction, null]
  }
}