import { $Enums, OrganizationUsers } from '@prisma/client'

export class OrganizationUserEntity implements OrganizationUsers {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  role: $Enums.UserRole
  userId: string
  organizationId: string
}
