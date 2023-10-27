export class TransactionRepository {
  db
  
  constructor(db) {
    this.db = db
  }

  async Register(transaction) {
    const error = await this.db.insert(transaction, "transaction")

    if(error !== null) {
      return error
    }

    return null
  }

  async Save(transaction) {
    const error = await this.db.update(transaction, "transaction")

    if(error !== null) {
      return error
    }

    return null
  }

  async Find(id) {
    const [transaction, error] = await this.db.select("transaction", {
      id
    })

    if(error !== null) {
      return [null, "No transaction found"]
    }

    return [transaction, null]
  }
}