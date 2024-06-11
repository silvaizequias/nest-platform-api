import { Injectable } from '@nestjs/common'
import { CreateUserDto, DeleteUserDto, UpdateUserDto } from './users.dto'

@Injectable()
export class UsersService {
  constructor() {}

  create(createUserDto: CreateUserDto) {
    return createUserDto
  }

  findAll() {
    return []
  }

  findById(id: string) {
    return id
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return { id, updateUserDto }
  }

  remove(id: string, deleteUserDto: DeleteUserDto) {
    return { id, deleteUserDto }
  }
}
