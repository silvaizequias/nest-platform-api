import { HttpException, Injectable } from '@nestjs/common'
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './organizations.dto'

@Injectable()
export class OrganizationsService {
  create(createOrganizationDto: CreateOrganizationDto) {
    try {
      return createOrganizationDto
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  findAll() {
    try {
      return []
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  findOne(id: string) {
    try {
      return id
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    try {
      return { id, updateOrganizationDto }
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  remove(id: string) {
    try {
      return id
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }
}
