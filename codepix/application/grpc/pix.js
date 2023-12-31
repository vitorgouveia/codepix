export class PixService {
  #pixUseCase
  
  constructor(pixUseCase) {
    this.#pixUseCase = pixUseCase
  }

  async RegisterPixKey(call) {
    const key = call.request.key
    const kind = call.request.kind
    const accountId = call.request.accountId

    const [registeredKey, error] = await this.#pixUseCase.RegisterKey(key, kind, accountId)
    if(error !== null) {
      return [
        {
          status: "not created",
          error: error
        }, 
        error
      ]
    }
    
    return [
      {
        id: registeredKey.id,
        status: "created",
      },
      null
    ]
  }

  async Find(call) {
    const key = call.request.key
    const kind = call.request.kind

    const [pixKey, error] = await this.#pixUseCase.FindKey(key, kind)
    if(error !== null) {
      return [
        {}, 
        error
      ]
    }
    
    return [
      {
        id: pixKey.id,
        kind: pixKey.kind,
        key: pixKey.key,
        account: {
          accountId: pixKey.accountId,
          accountNumber: pixKey.account.number,
          bankId: pixKey.account.bankId,
          bankName: pixKey.account.bank.name,
          ownerName: pixKey.account.ownerName,
          createdAt: pixKey.account.createdAt.toString(),
        },
        createdAt: pixKey.createdAt.toString(),
      },
      null
    ]
  }
}