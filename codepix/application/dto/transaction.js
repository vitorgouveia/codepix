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
    pixKeyKindTo,
    description,
    status,
    error
  }) {
    this.id = id
    this.accountId = accountId
    this.amount = amount
    this.pixKeyTo = pixKeyTo
    this.pixKeyKindTo = pixKeyKindTo
    this.description = description
    this.status = status
    this.error = error
  }

  isValid() {
    if(this.amount <= 0) {
      return "'amount' must be greater than 0!"
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