import assert from "node:assert"
import { describe, it } from "node:test"

import { Bank } from "./bank.js"

describe("Bank", () => {
  it("should create successfully", () => {
    const code = "B-0001"
    const name = "Banco X"
    const [bank, error] = Bank.New(code, name)

    assert.equal(error, null)

    assert.equal(typeof bank.id, "string")
    assert.equal(bank.createdAt instanceof Date, true)
    assert.equal(bank.code, code)
    assert.equal(bank.name, name)
  })

  it("should throw when 'code' is null", () => {
    const code = null
    const name = "Banco X"
    const [bank, error] = Bank.New(code, name)

    assert.equal(error, "'code' cannot be null!")
    assert.equal(bank, null)
  })

  it("should throw when 'name' is null", () => {
    const code = "B-0001"
    const name = null
    const [bank, error] = Bank.New(code, name)

    assert.equal(error, "'name' cannot be null!")
    assert.equal(bank, null)
  })
})