import { $Enums, Member } from '@prisma/client'

export class MemberEntity implements Member {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  role: $Enums.MemberRole
  userId: string
  organizationId: string
}
