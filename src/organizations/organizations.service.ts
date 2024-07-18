import { Injectable } from '@nestjs/common'
import {
  CreateOrganizationValidator,
  RemoveOrganizationValidator,
  UpdateOrganizationValidator,
} from './organization.validator'
import { createOrganizationRepository } from 'src/repositories/organizations/create-organization.repository'
import {
  findByDocumentOrganizationRepository,
  findManyOrganizationRepository,
  findOneOrganizationRepository,
} from 'src/repositories/organizations/find-organization.repository'
import { updateOrganizationRepository } from 'src/repositories/organizations/update-organization.repository'
import { removeOrganizationRepository } from 'src/repositories/organizations/remove-organization.repository'

@Injectable()
export class OrganizationsService {
  async create(createOrganizationValidator: CreateOrganizationValidator) {
    return await createOrganizationRepository(createOrganizationValidator)
  }

  async findByDocument(document: string) {
    return await findByDocumentOrganizationRepository(document)
  }

  async findMany() {
    return await findManyOrganizationRepository()
  }

  async findOne(id: string) {
    return await findOneOrganizationRepository(id)
  }

  async update(
    id: string,
    updateOrganizationValidator: UpdateOrganizationValidator,
  ) {
    return await updateOrganizationRepository(id, updateOrganizationValidator)
  }

  async remove(
    id: string,
    removeOrganizationValidator: RemoveOrganizationValidator,
  ) {
    return await removeOrganizationRepository(id, removeOrganizationValidator)
  }
}
