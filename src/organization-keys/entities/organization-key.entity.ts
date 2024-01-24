import { OrganizationKeys } from '@prisma/client'

export class OrganizationKeyEntity implements OrganizationKeys {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  organizationId: string
  expireIn: Date
  active: boolean
  authorizationKey: string
}
