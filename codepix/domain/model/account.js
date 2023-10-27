import * as uuid from "uuid"

import { Base } from "./base.js";

export class Account extends Base {
  bank
  number
  ownerName
  pixKeys
  
  constructor({ bank, number, ownerName }) {
    super()

    this.bank = bank
    this.bank = bank
    this.number = number
    this.ownerName = ownerName
  }

  isValid() {
    if(this.ownerName === null) {
      return "'ownerName' cannot be null!"
    }

    if(this.number === null) {
      return "'number' cannot be null!"
    }
    
    return null
  }

  static New(bank, number, ownerName) {
    const account = new Account({
      bank,
      number,
      ownerName
    })

    account.id = uuid.v4()
    account.createdAt = new Date()

    const error = account.isValid()

    if(error != null) {
      return [null, error]
    }

    return [account, null]
  }
}