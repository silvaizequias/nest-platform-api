import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import {
  findUserByDocument,
  findUserByEmail,
  findUserById,
  findUserByPhone,
  findUsers,
} from './repositories/GET'
import { updateUser } from './repositories/PATCH'
import { removeUser } from './repositories/DELETE'
import { createUser, login } from './repositories/POST'
import { LoginUserDto } from './dto/login-user.dto'
import { DeleteUserDto } from './dto/delete-user.dto'

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return createUser(createUserDto)
  }

  login(loginUserDto: LoginUserDto) {
    return login(loginUserDto)
  }

  findAll() {
    return findUsers()
  }

  findByDocument(document: string) {
    return findUserByDocument(document)
  }

  findByEmail(email: string) {
    return findUserByEmail(email)
  }

  findOne(id: string) {
    return findUserById(id)
  }

  findByPhone(phone: string) {
    return findUserByPhone(phone)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return updateUser(id, updateUserDto)
  }

  remove(id: string, deleteUserDto: DeleteUserDto) {
    return removeUser(id, deleteUserDto)
  }
}
