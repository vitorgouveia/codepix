import assert from "node:assert"
import { describe, it } from "node:test"
import validator from "validator"

import { DB } from "../../infra/db/db.js"
import { PixKeyRepository } from "../../infra/repository/pix.js"
import { PixUseCase } from "./pix.js"

import { Account } from "../../domain/model/account.js"
import { Bank } from "../../domain/model/bank.js"

describe("Pix Use Case", () => {
  const code = "B-0001"
  const name = "Bradesco"
  const [bank] = Bank.New(code, name)

  const accountNumber = "A-0001"
  const ownerName = "Vitor Gouveia"
  const [account] = Account.New(bank, accountNumber, ownerName)

  describe("RegisterKey", () => {
    it("should execute successfully", async () => {
      const db = new DB({
        account: [
          account
        ],
      })

      db.connectDB("development")

      const pixRepository = new PixKeyRepository(db)

      const useCase = new PixUseCase(pixRepository)

      const key = "000.000.000-00"
      const kind = "cpf"
      const accountId = account.id
  
      const [pixKey, error] = await useCase.RegisterKey(key, kind, accountId)

      assert.equal(error, null)
      assert.equal(validator.isUUID(pixKey.id), true)
      assert.equal(pixKey.createdAt instanceof Date, true)
      assert.equal(pixKey.kind, kind)
      assert.equal(pixKey.key, key)
      assert.equal(pixKey.accountId, account.id)
    })

    it("should fail when account does not exist", async () => {
      const db = new DB({
        account: [],
      })

      db.connectDB("development")

      const pixRepository = new PixKeyRepository(db)

      const useCase = new PixUseCase(pixRepository)

      const key = "000.000.000-00"
      const kind = "cpf"
      const accountId = account.id
  
      const [pixKey, error] = await useCase.RegisterKey(key, kind, accountId)

      assert.equal(error, "No account found")
      assert.equal(pixKey, null)
    })
  })
})