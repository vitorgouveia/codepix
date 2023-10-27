import * as uuid from "uuid"

import { Base } from "./base.js";

export class PixKey extends Base {
  kind
  key
  accountId
  account
  status
  
  constructor({ kind, key, account, status }) {
    super()

    this.kind = kind
    this.key = key
    this.accountId = account.id
    this.account = account
    this.status = status
  }

  isValid() {
    if(this.kind !== "email" && this.kind !== "cpf") {
      return "'kind' must be of type 'email' or 'cpf'!"
    }

    if(this.status !== "active" && this.status !== "inactive") {
      return "'status' must be of type 'active' or 'inactive'!"
    }
    
    return null
  }

  static New(kind, account, key) {
    const pixKey = new PixKey({
      kind,
      account,
      key,
      status: "active"
    })

    pixKey.id = uuid.v4()
    pixKey.createdAt = new Date()

    const error = pixKey.isValid()

    if(error != null) {
      return [null, error]
    }

    return [pixKey, null]
  }
}