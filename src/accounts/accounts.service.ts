import { Injectable } from '@nestjs/common'
import { CreateAccountDto, UpdateAccountDto } from './accounts.dto'

@Injectable()
export class AccountsService {
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
