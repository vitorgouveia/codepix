import * as uuid from "uuid"

import { Base } from "./base.js";

export class Bank extends Base {
  code
  name
  accounts

  constructor({ code, name }) {
    super()

    this.code = code
    this.name = name
  }

  isValid() {
    if(this.code === null) {
      return "'code' cannot be null!"
    }

    if(this.name === null) {
      return "'name' cannot be null!"
    }
    
    return null
  }

  static New(code, name) {
    const bank = new Bank({
      code,
      name,
    })

    bank.id = uuid.v4()
    bank.createdAt = new Date()

    const error = bank.isValid()

    if(error != null) {
      return [null, error]
    }

    return [bank, null]
  }
}