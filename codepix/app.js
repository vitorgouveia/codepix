import dotenv from "dotenv"

import { DB } from "./infra/db/db.js"

const { error } = dotenv.config()

if(error !== undefined) {
  console.error(error)
  throw new Error("Failed while loading .env")
}

export const database = new DB()

database.connectDB(process.env.NODE_ENV)