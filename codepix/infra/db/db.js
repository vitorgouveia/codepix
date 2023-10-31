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

  update(entity, table) {
    const error = entity.isValid()

    if(error !== null) {
      return error
    }

    if(!this.store[table]) {
      this.store[table] = []
    }
    
    if(this.store[table].length === 0) {
      this.store[table].push(entity)
      return null
    }

    const index = this.store[table]
      .findIndex(item => item.id == entity.id)

    if(index === -1) {
      this.store[table].push(entity)
      return null
    }

    console.log(`updating at index ${index}`)
    console.log(`updating record: ${JSON.stringify(this.store[table][index])}`)

    this.store[table][index] = entity

    return error
  }
}