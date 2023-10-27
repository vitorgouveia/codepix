import { uuid } from "../validator.js"

export class Base {
  id       
  createdAt
  updatedAt

  constructor(props) {
    if(props) {
      const { id, createdAt, updatedAt } = props
      this.id = uuid(id)
      this.createdAt = createdAt
      this.updatedAt = updatedAt
    }
  }
}