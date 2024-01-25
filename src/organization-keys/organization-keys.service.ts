import { Injectable } from '@nestjs/common'
import { CreateOrganizationKeyDto } from './dto/create-organization-key.dto'
import { UpdateOrganizationKeyDto } from './dto/update-organization-key.dto'
import { createOrganizationKeyRepository } from './repositories/create-organization-key.repository'
import { readOrganizationKeyRepository } from './repositories/read-organization-key.repository'
import { updateOrganizationKeyRepository } from './repositories/update-organziation-key.repository'
import { deleteOrganizationKeyRepository } from './repositories/delete-organization-key.repository'
import { readOrganizationKeyByKeyRepository } from './repositories/read-organization-key-by-key.repository'

@Injectable()
export class OrganizationKeysService {
  create(createOrganizationKeyDto: CreateOrganizationKeyDto) {
    return createOrganizationKeyRepository(createOrganizationKeyDto)
  }

  findAll() {
    return readOrganizationKeyRepository()
  }

  findByKey(authorizationKey: string) {
    return readOrganizationKeyByKeyRepository(authorizationKey)
  }

  findOne(id: string) {
    return readOrganizationKeyRepository(id)
  }

  update(id: string, updateOrganizationKeyDto: UpdateOrganizationKeyDto) {
    return updateOrganizationKeyRepository(id, updateOrganizationKeyDto)
  }

  remove(id: string) {
    return deleteOrganizationKeyRepository(id)
  }
}
