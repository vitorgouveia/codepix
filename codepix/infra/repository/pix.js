export class PixKeyRepository {
  db
  
  constructor(db) {
    this.db = db
  }

  async AddBank(bank) {
    const error = await this.db.insert(bank, "bank")

    if(error !== null) {
      return error
    }

    return null
  }

  async AddAccount(account) {
    const error = await this.db.insert(account, "account")

    if(error !== null) {
      return error
    }

    return null
  }
  
  async RegisterKey(pixKey) {
    const error = await this.db.insert(pixKey, "pixKey")

    if(error !== null) {
      return error
    }

    return null
  }

  async FindKeyById(key, kind) {
    const [pixKey, error] = await this.db.select("pixKey", {
      kind,
      key
    })

    if(error !== null) {
      return [null, "No key found"]
    }

    return [pixKey, null]
  }

  async FindAccount(id) {
    const [account, error] = await this.db.select("account", {
      id
    })

    if(error !== null) {
      return [null, "No account found"]
    }

    return [account, null]
  }

  async FindBank(id) {
    const [bank, error] = await this.db.select("bank", {
      id
    })

    if(error !== null) {
      return [null, "No bank found"]
    }

    return [bank, null]
  }
}