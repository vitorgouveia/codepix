import { describe, it } from "node:test"
import assert from "node:assert"

import { Account } from "./account.js"
import { Bank } from "./bank.js"
import { PixKey } from "./pix-key.js"

describe("PixKey", () => {
  const code = "B-0001"
  const name = "Bradesco"
  const [bank] = Bank.New(code, name)

  const accountNumber = "A-0001"
  const ownerName = "Vitor Gouveia"
  const [account] = Account.New(bank, accountNumber, ownerName)
  
  it("should create with kind 'email' successfully", () => {
    const kind = "email"
    const key = "test@test.com"
    const [pixkey, error] = PixKey.New(kind, account, key)

    assert.equal(error, null)

    assert.equal(typeof pixkey.id, "string")
    assert.equal(pixkey.createdAt instanceof Date, true)
    assert.equal(pixkey.kind, "email")
    assert.equal(pixkey.key, key)
    assert.equal(pixkey.status, "active")
    assert.deepEqual(pixkey.account, account)
  })

  it("should create with kind 'cpf' successfully", () => {
    const kind = "cpf"
    const key = "test@test.com"
    const [pixkey, error] = PixKey.New(kind, account, key)

    assert.equal(error, null)

    assert.equal(typeof pixkey.id, "string")
    assert.equal(pixkey.createdAt instanceof Date, true)
    assert.equal(pixkey.kind, "cpf")
    assert.equal(pixkey.key, key)
    assert.equal(pixkey.status, "active")
    assert.deepEqual(pixkey.account, account)
  })

  it("should throw when 'kind' is neither 'email' or 'cpf' is null", () => {
    const kind = "name"
    const key = "john doe"
    const [pixkey, error] = PixKey.New(kind, account, key)

    assert.equal(error, "'kind' must be of type 'email' or 'cpf'!")
    assert.equal(pixkey, null)
  })
})