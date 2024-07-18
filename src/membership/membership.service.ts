import { Injectable } from '@nestjs/common'
import {
  CreateMembershipValidator,
  RemoveMembershipValidator,
  UpdateMembershipValidator,
} from './membership.validator'
import { createMembershipRepository } from 'src/repositories/membership/create-membership.repository'
import {
  findByOrganizationMembershipRepository,
  findByUserMembershipRepository,
  findManyMembershipRepository,
  findOneMembershipRepository,
} from 'src/repositories/membership/find-membership.repository'
import { updateMembershipRepository } from 'src/repositories/membership/update-membership.repository'
import { removeMembershipRepository } from 'src/repositories/membership/remove-membership.repository'

@Injectable()
export class MembershipService {
  async create(createMembershipValidator: CreateMembershipValidator) {
    return await createMembershipRepository(createMembershipValidator)
  }

  async findByOrganization(organizationId: string) {
    return await findByOrganizationMembershipRepository(organizationId)
  }

  async findByUser(userId: string) {
    return await findByUserMembershipRepository(userId)
  }

  async findMany() {
    return await findManyMembershipRepository()
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
