import assert from "node:assert"
import { describe, it } from "node:test"

import * as uuid from "uuid"

import { Base } from "./base.js"

describe("Base", () => {
  it("should create successfully", () => {
    const base = new Base({
      id: uuid.v4(),
      createdAt: new Date()
    })

    assert.equal(typeof base.id, "string")
    assert.equal(base.createdAt instanceof Date, true)
  })

  it("should throw when 'id' is not of type 'uuid'", () => {
    try {
      const base = new Base({
        id: "123",
        createdAt: new Date()
      })
    } catch(error) {
      assert.equal(error.message, `"123" must be of type UUID!`)
    }
  })
})