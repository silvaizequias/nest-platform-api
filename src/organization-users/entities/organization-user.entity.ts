import { OrganizationUsers } from '@prisma/client'

export class OrganizationUserEntity implements OrganizationUsers {
  id: string
  createdAt: Date
  updatedAt: Date
  organizationId: string
  userId: string
  isActive: boolean
  role: string
}
