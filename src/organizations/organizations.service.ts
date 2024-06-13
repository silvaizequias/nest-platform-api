import { Injectable } from '@nestjs/common'
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './organizations.dto'

@Injectable()
export class OrganizationsService {
  create(createOrganizationDto: CreateOrganizationDto) {
    return createOrganizationDto
  }

  findAll() {
    return []
  }

  findOne(id: string) {
    return id
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return { id, updateOrganizationDto }
  }

  remove(id: string) {
    return id
  }
}
