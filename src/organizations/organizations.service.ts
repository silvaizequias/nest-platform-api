import { Injectable } from '@nestjs/common'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { createOrganizationRepository } from './repositories/create-organization.repository'
import { readOrganizationRepository } from './repositories/read-organization.repository'
import { updateOrganizationRepository } from './repositories/update-organization.repository'
import { deleteOrganizationRepository } from './repositories/delete-organization.repository'

@Injectable()
export class OrganizationsService {
  create(createOrganizationDto: CreateOrganizationDto) {
    return createOrganizationRepository(createOrganizationDto)
  }

  findAll() {
    return readOrganizationRepository()
  }

  findOne(id: string) {
    return readOrganizationRepository(id)
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return updateOrganizationRepository(id, updateOrganizationDto)
  }

  remove(id: string) {
    return deleteOrganizationRepository(id)
  }
}
