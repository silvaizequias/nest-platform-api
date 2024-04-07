import { Injectable } from '@nestjs/common'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { createMyOrganization, createOrganization } from './repositories/POST'
import {
  findOrganizationByDocument,
  findOrganizationById,
  findOrganizations,
  verifyOrganizationByDocument,
} from './repositories/GET'
import { updateOrganization } from './repositories/PATCH'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { removeOrganization } from './repositories/DELETE'
import { DeleteOrganizationDto } from './dto/delete-organization.dto'

@Injectable()
export class OrganizationsService {
  create(createOrganizationDto: CreateOrganizationDto) {
    return createOrganization(createOrganizationDto)
  }

  createFromMyPhone(
    phone: string,
    createOrganizationDto: CreateOrganizationDto,
  ) {
    return createMyOrganization(phone, createOrganizationDto)
  }

  findAll() {
    return findOrganizations()
  }

  findByDocument(document: string) {
    return findOrganizationByDocument(document)
  }

  findOne(id: string) {
    return findOrganizationById(id)
  }

  verifyByDocument(document: string) {
    return verifyOrganizationByDocument(document)
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return updateOrganization(id, updateOrganizationDto)
  }

  remove(id: string, deleteOrganizationDto: DeleteOrganizationDto) {
    return removeOrganization(id, deleteOrganizationDto)
  }
}
