import { PixKey } from "../../domain/model/pix-key.js"

export class PixUseCase {
  #pixKeyRepository
  
  constructor(pixKeyRepository) {
    this.#pixKeyRepository = pixKeyRepository
  }

  async RegisterKey(key, kind, accountId) {
    let [account, accountError] = await this.#pixKeyRepository.FindAccount(accountId)
    if(accountError !== null) {
      return [null, accountError]
    }

    let [pixKey, pixKeyError] = PixKey.New(kind, account, key)
    if(pixKeyError !== null) {
      return [null, pixKeyError]
    }

    const registerError = await this.#pixKeyRepository.RegisterKey(pixKey)
    if(registerError !== null) {
      return [null, registerError]
    }

    return [pixKey, null]
  }

  async FindKey(key, kind) {
    const [pixKey, error] = await this.#pixKeyRepository.FindKeyByKind(key, kind)

    if(error !== null) {
      return [null, error]
    }

    return [pixKey, null]
  }
}