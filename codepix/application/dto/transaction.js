import { Status } from "../../domain/model/transaction.js"

export class TransactionDTO {
  id
  accountId
  amount
  pixKeyTo
  pixKindTo
  description
  status
  error
  
  constructor({
    id,
    accountId,
    amount,
    pixKeyTo,
    pixKindTo,
    description,
    status,
    error
  }) {
    this.id = id
    this.accountId = accountId
    this.amount = amount
    this.pixKeyTo = pixKeyTo
    this.pixKindTo = pixKindTo
    this.description = description
    this.status = status
    this.error = error
  }

  isValid() {
    if(this.amount <= 0) {
      return "'amount' must be greater than 0!"
    }

    if(this.status !== Status.Pending && this.status !== Status.Completed && this.status !== Status.Error) {
      return "'status' is invalid!"
    }

    // todo, accountFrom does not exist
    if(this.pixKeyTo.accountId === this.accountFrom.id) {
      return "The source and destination account cannot be the same!"
    }
    
    return null
  }

  static ParseJSON(json) {
    let transactionJSON
    try {
      transactionJSON = JSON.parse(json.toString())
    } catch(error) {
      return [null, "Failed to parse transaction JSON."]
    }

    console.log(transactionJSON)
    const transaction = new TransactionDTO(transactionJSON)

    const error = transaction.isValid()

    if(error !== null) {
      return [null, error]
    }

    return [transaction, null]
  }
  
  static Serialize(transaction) {
    const error = transaction.isValid()

    if(error !== null) {
      return [null, error]
    }
    
    return [JSON.stringify(transaction), null]
  }
}