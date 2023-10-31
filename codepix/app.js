import dotenv from "dotenv"

import { DB } from "./infra/db/db.js"

const { error } = dotenv.config()

if(error !== undefined) {
  console.error(error)
  throw new Error("Failed while loading .env")
}

const bank1 = {
  code: "001",
  name: "BBX",
  accounts: []
}

const bank2 = {
  code: "002",
  name: "CTER",
  accounts: []
}

const acct1 = {
  id: "6e4635ce-88d1-4e58-9597-d13fc446ee47",
  bank: bank1,
  number: "1111",
  ownerName: "User BBX 1",
  pixKeys: [],
  createdAt: new Date(),
}

const acct2 = {
  id: "51a720b2-5144-4d7f-921d-57023b1e24c1",
  bank: bank1,
  number: "2222",
  ownerName: "User BBX 2",
  pixKeys: [],
  createdAt: new Date(),
}

export const database = new DB({
  pixKey: [
    {
      id: "8871e6b2-ce6d-4566-b1bc-83d5a9716f1c",
      createdAt: new Date(),
      kind: "cpf",
      key: "1",
      accountId: acct2.id,
      account: acct2,
      status: "active",
    }
  ],
  account: [
    acct1,
    acct2,
    {
      id: "103cc632-78e7-4476-ab63-d5ad3a562d26",
      bank: bank2,
      number: "3333",
      ownerName: "User CTER 1",
      pixKeys: [],
      createdAt: new Date(),
    },
    {
      id: "463b1b2a-b5fa-4b88-9c31-e5c894a20ae3",
      bank: bank2,
      number: "4444",
      ownerName: "User CTER 2",
      pixKeys: [],
      createdAt: new Date(),
    },
  ],
})

database.connectDB(process.env.NODE_ENV)