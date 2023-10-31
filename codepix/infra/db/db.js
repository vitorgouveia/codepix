import dotenv from "dotenv"

export class DB {
  /** @type {Record<string, any[]>} */
  store = {}
  
  constructor(store = {}) {
    this.store = store
  }

  connectDB(env) {
    // connect to db

    if(env === "development") {
      // test database
    } else {
      // prd
    }
  }

  insert(entity, table) {
    const error = entity.isValid()

    if(!this.store[table]) {
      this.store[table] = []
    }

    this.store[table].push(entity)

    return error
  }

  select(table, query) {
    const arr = this.store[table] || []

    const item = arr.find(item => {
      for (const key in query) {
        if (item[key] !== query[key]) {
          return false;
        }
      }

      return true;
    })

    if(!item) {
      return [null, "Could not find item"]
    }

    return [item, null]
  }
}