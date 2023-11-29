import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { createUserRepository } from './repositories/create-user.repository'
import { readUserRepository } from './repositories/read-user.repository'
import { updateUserRepository } from './repositories/update-user.repository'
import { deleteUserRepository } from './repositories/delete-user.repository'

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return createUserRepository(createUserDto)
  }

  findAll() {
    return readUserRepository()
  }

  findOne(id: string) {
    return readUserRepository(id)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return updateUserRepository(id, updateUserDto)
  }

  remove(id: string) {
    return deleteUserRepository(id)
  }
}
