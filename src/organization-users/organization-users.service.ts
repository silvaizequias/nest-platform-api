import { Injectable } from '@nestjs/common'
import { CreateOrganizationUserDto } from './dto/create-organization-user.dto'
import { UpdateOrganizationUserDto } from './dto/update-organization-user.dto'
import { createOrganizationUserRepository } from './repositories/create-organization-user.repository'
import { readOrganizationUserRepository } from './repositories/read-organization-user.repository'
import { updateOrganizationUserRepository } from './repositories/update-organization-user.repository'
import { deleteOrganizationUserRepository } from './repositories/delete-organization-user.repository'

@Injectable()
export class OrganizationUsersService {
  create(createOrganizationUserDto: CreateOrganizationUserDto) {
    return createOrganizationUserRepository(createOrganizationUserDto)
  }

  findAll() {
    return readOrganizationUserRepository()
  }

  findOne(id: string) {
    return readOrganizationUserRepository(id)
  }

  update(id: string, updateOrganizationUserDto: UpdateOrganizationUserDto) {
    return updateOrganizationUserRepository(id, updateOrganizationUserDto)
  }

  remove(id: string) {
    return deleteOrganizationUserRepository(id)
  }
}
