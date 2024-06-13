import { Injectable } from '@nestjs/common'
import { CreateAccountDto, UpdateAccountDto } from './accounts.dto'

@Injectable()
export class AccountsService {
  randomCode = Math.random().toString(32).substr(2, 6).toUpperCase()

  create(createAccountDto: CreateAccountDto) {
    return createAccountDto
  }

  findAll() {
    return []
  }

  findOne(id: string) {
    return id
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return { id, updateAccountDto }
  }

  remove(id: string) {
    return id
  }
}
