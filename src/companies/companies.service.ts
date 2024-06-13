import { Injectable } from '@nestjs/common'
import { CreateCompanyDto, UpdateCompanyDto } from './companies.dto'

@Injectable()
export class CompaniesService {
  create(createCompanyDto: CreateCompanyDto) {
    return createCompanyDto
  }

  findAll() {
    return []
  }

  findOne(id: string) {
    return id
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return { id, updateCompanyDto }
  }

  remove(id: string) {
    return id
  }
}
