import { Injectable } from '@nestjs/common'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { createMember } from './repositories/POST'
import {
  findMemberById,
  findMemberByPhone,
  findMembers,
} from './repositories/GET'
import { updateMember } from './repositories/PATCH'
import { removeMember } from './repositories/DELETE'
import { DeleteMemberDto } from './dto/delete-member.dto'

@Injectable()
export class MembersService {
  create(createMemberDto: CreateMemberDto) {
    return createMember(createMemberDto)
  }

  findAll() {
    return findMembers()
  }

  findByPhone(phone: string) {
    return findMemberByPhone(phone)
  }

  findOne(id: string) {
    return findMemberById(id)
  }

  update(id: string, updateMemberDto: UpdateMemberDto) {
    return updateMember(id, updateMemberDto)
  }

  remove(id: string, deleteMemberDto: DeleteMemberDto) {
    return removeMember(id, deleteMemberDto)
  }
}
