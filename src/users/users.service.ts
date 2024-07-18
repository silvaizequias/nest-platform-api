import { Injectable } from '@nestjs/common'
import {
  CreateUserValidator,
  RemoveUserValidator,
  UpdateUserValidator,
} from './user.validator'
import { createUserRepository } from 'src/repositories/users/create-user.repository'
import {
  findManyUserRepository,
  findOneUserRepository,
} from 'src/repositories/users/find-user.repository'
import { updateUserRepository } from 'src/repositories/users/update-user.repository'
import { removeUserRepository } from 'src/repositories/users/remove-user.repository'

@Injectable()
export class UsersService {
  async create(createUserValidator: CreateUserValidator) {
    return await createUserRepository(createUserValidator)
  }

  async findMany() {
    return await findManyUserRepository()
  }

  async findOne(id: string) {
    return await findOneUserRepository(id)
  }

  async update(id: string, updateUserValidator: UpdateUserValidator) {
    return await updateUserRepository(id, updateUserValidator)
  }

  async remove(id: string, removeUserValidator: RemoveUserValidator) {
    return await removeUserRepository(id, removeUserValidator)
  }
}
