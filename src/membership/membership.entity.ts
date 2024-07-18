import { Membership } from '@prisma/client'

export class MembershipEntity implements Membership {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  role: string
  userId: string
  organizationId: string
}
