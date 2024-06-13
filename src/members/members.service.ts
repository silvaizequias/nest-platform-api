import { Injectable } from '@nestjs/common'
import { CreateMemberDto, UpdateMemberDto } from './members.dto'

@Injectable()
export class MembersService {
  create(createMemberDto: CreateMemberDto) {
    return createMemberDto
  }

  findAll() {
    return []
  }

  findOne(id: string) {
    return id
  }

  update(id: string, updateMemberDto: UpdateMemberDto) {
    return { id, updateMemberDto }
  }

  remove(id: string) {
    return id
  }
}
