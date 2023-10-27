import { describe, it } from "node:test"
import assert from "node:assert"

import { Account } from "./account.js"
import { Bank } from "./bank.js"

describe("Account", () => {
  const code = "B-0001"
  const name = "Bradesco"

  const [bank] = Bank.New(code, name)
  
  it("should create successfully", () => {
    const accountNumber = "A-0001"
    const ownerName = "Vitor Gouveia"
    const [account, error] = Account.New(bank, accountNumber, ownerName)

    assert.equal(error, null)

    assert.equal(typeof account.id, "string")
    assert.equal(account.createdAt instanceof Date, true)
    assert.equal(account.number, accountNumber)
    assert.equal(account.ownerName, ownerName)
  })

  it("should throw when 'ownerName' is null", () => {
    const accountNumber = "A-0001"
    const ownerName = null
    const [account, error] = Account.New(bank, accountNumber, ownerName)

    assert.equal(error, "'ownerName' cannot be null!")
    assert.equal(account, null)
  })

  it("should throw when 'number' is null", () => {
    const accountNumber = null
    const ownerName = "Vitor Gouveia"
    const [account, error] = Account.New(bank, accountNumber, ownerName)

    assert.equal(error, "'number' cannot be null!")
    assert.equal(account, null)
  })
})