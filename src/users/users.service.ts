import { Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './users.dto'

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return createUserDto
  }

  findAll() {
    return [{}]
  }

  findOne(id: string) {
    return id
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return { id, updateUserDto }
  }

  remove(id: string) {
    return id
  }
}
