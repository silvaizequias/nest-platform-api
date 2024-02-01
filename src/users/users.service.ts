import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { createUserRepository } from './repositories/create-user.repository'
import { readUserRepository } from './repositories/read-user.repository'
import { updateUserRepository } from './repositories/update-user.repository'
import { deleteUserRepository } from './repositories/delete-user.repository'
import { readUserByEmailRepository } from './repositories/read-user-by-email.repository'
import { readUserByPhoneRepository } from './repositories/read-user-by-phone.repository'
import { readUserByDocumentRepository } from './repositories/read-user-by-document.repository'

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return createUserRepository(createUserDto)
  }

  findAll() {
    return readUserRepository()
  }

  findByDocument(document: string) {
    return readUserByDocumentRepository(document)
  }

  findByEmail(email: string) {
    return readUserByEmailRepository(email)
  }

  findById(id: string) {
    return readUserRepository(id)
  }

  findByPhone(phone: string) {
    return readUserByPhoneRepository(phone)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return updateUserRepository(id, updateUserDto)
  }

  remove(id: string) {
    return deleteUserRepository(id)
  }
}
