import * as uuid from "uuid"

import { Base } from "./base.js";

export const Status = {
  Pending: "pending",
  Completed: "completed",
  Error: "error",
  Confirmed: "confirmed",
}

export class Transaction extends Base {
  accountFrom
  amount
  pixKeyTo
  status
  description
  cancelDescription
  
  constructor({
    accountFrom,
    amount,
    pixKeyTo,
    status,
    description
  }) {
    super()

    this.accountFrom = accountFrom
    this.amount = amount
    this.pixKeyTo = pixKeyTo
    this.status = status
    this.description = description
  }

  isValid() {
    if(this.amount <= 0) {
      return "'amount' must be greater than 0!"
    }

    if(this.status !== Status.Pending && this.status !== Status.Completed && this.status !== Status.Error) {
      return "'status' is invalid!"
    }

    if(this.pixKeyTo.accountId === this.accountFrom.id) {
      return "The source and destination account cannot be the same!"
    }
    
    return null
  }

  static New(accountFrom, amount, pixKeyTo, description) {
    const transaction = new Transaction({
      accountFrom,
      amount,
      pixKeyTo,
      status: Status.Pending,
      description
    })

    transaction.id = uuid.v4()
    transaction.createdAt = new Date()

    const error = transaction.isValid()

    if(error != null) {
      return [null, error]
    }

    return [transaction, null]
  }

  Complete() {
    this.status = Status.Completed
    this.updatedAt = new Date()

    const error = this.isValid()

    return error
  }

  Confirm() {
    this.status = Status.Confirmed
    this.updatedAt = new Date()

    const error = this.isValid()

    return error
  }

  Cancel(description) {
    this.status = Status.Error
    this.updatedAt = new Date()
    this.description = description

    const error = this.isValid()

    return error
  }
}