import { describe, it } from "node:test"
import assert from "node:assert"

import { Account } from "./account.js"
import { Bank } from "./bank.js"
import { PixKey } from "./pix-key.js"
import { Status, Transaction } from "./transaction.js"

describe("Transaction", () => {
  const code = "B-0001"
  const name = "Bradesco"
  const [bank] = Bank.New(code, name)

  const [accountFrom] = Account.New(bank, "A-0001", "Vitor Gouveia")
  const [accountTo] = Account.New(bank, "A-0002", "John Doe")

  const [pixkey] = PixKey.New("email", accountTo, "test@test.com")
  
  it("should create successfully", () => {
    const amount = 100
    const description = "Presente"
    const [transaction, error] = Transaction.New(
      accountFrom,
      amount,
      pixkey,
      description
    )

    assert.equal(error, null)

    assert.deepStrictEqual(transaction.accountFrom, accountFrom)
    assert.equal(transaction.amount, amount)
    assert.equal(transaction.pixKeyTo, pixkey)
    assert.equal(transaction.status, Status.Pending)
    assert.equal(transaction.description, description)
  })

  it("should update status when calling 'Complete()'", () => {
    const amount = 100
    const description = "Presente"
    const [transaction, error] = Transaction.New(
      accountFrom,
      amount,
      pixkey,
      description
    )

    assert.equal(error, null)
    assert.equal(transaction.status, Status.Pending)
    
    transaction.Complete()
    
    assert.equal(transaction.status, Status.Completed)
  })

  it("should update status when calling 'Confirm()'", () => {
    const amount = 100
    const description = "Presente"
    const [transaction, error] = Transaction.New(
      accountFrom,
      amount,
      pixkey,
      description
    )

    assert.equal(error, null)
    assert.equal(transaction.status, Status.Pending)
    
    transaction.Confirm()
    
    assert.equal(transaction.status, Status.Confirmed)
  })

  it("should update status when calling 'Cancel()'", () => {
    const amount = 100
    const description = "Presente"
    const [transaction, error] = Transaction.New(
      accountFrom,
      amount,
      pixkey,
      description
    )

    assert.equal(error, null)
    assert.equal(transaction.status, Status.Pending)
    
    const reason = "test"
    transaction.Cancel(reason)
    
    assert.equal(transaction.status, Status.Error)
    assert.equal(transaction.description, reason)
  })

  it("should fail when amount is less than 0", () => {
    const amount = -1
    const description = "Presente"
    const [transaction, error] = Transaction.New(
      accountFrom,
      amount,
      pixkey,
      description
    )

    assert.equal(error, "'amount' must be greater than 0!")
    assert.equal(transaction, null)
  })

  it("should fail when sending to same account", () => {
    const amount = 100
    const description = "Presente"
    pixkey.accountId = accountFrom.id
    const [transaction, error] = Transaction.New(
      accountFrom,
      amount,
      pixkey,
      description
    )

    assert.equal(error, "The source and destination account cannot be the same!")
    assert.equal(transaction, null)
  })
})