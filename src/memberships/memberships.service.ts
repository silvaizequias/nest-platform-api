import { Injectable } from '@nestjs/common'
import {
  CreateMembershipValidator,
  RemoveMembershipValidator,
  UpdateMembershipValidator,
} from './membership.validator'
import { createMembershipRepository } from 'src/repositories/memberships/create-membership.repository'
import {
  findByOrganizationMembershipRepository,
  findByUserMembershipRepository,
  findManyMembershipsRepository,
  findOneMembershipRepository,
} from 'src/repositories/memberships/find-membership.repository'
import { updateMembershipRepository } from 'src/repositories/memberships/update-membership.repository'
import { removeMembershipRepository } from 'src/repositories/memberships/remove-membership.repository'

@Injectable()
export class MembershipsService {
  async create(createMembershipValidator: CreateMembershipValidator) {
    return await createMembershipRepository(createMembershipValidator)
  }

  async findByOrganization(document: string) {
    return await findByOrganizationMembershipRepository(document)
  }

  async findByUser(phone: string) {
    return await findByUserMembershipRepository(phone)
  }

  async findMany() {
    return await findManyMembershipsRepository()
  }

  async findOne(id: string) {
    return await findOneMembershipRepository(id)
  }

  async update(
    id: string,
    updateMembershipValidator: UpdateMembershipValidator,
  ) {
    return await updateMembershipRepository(id, updateMembershipValidator)
  }

  async remove(
    id: string,
    removeMembershipValidator: RemoveMembershipValidator,
  ) {
    return await removeMembershipRepository(id, removeMembershipValidator)
  }
}
