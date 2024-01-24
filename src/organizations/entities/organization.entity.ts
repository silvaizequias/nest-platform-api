import { Organization } from '@prisma/client'

export class OrganizationEntity implements Organization {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  name: string
  image: string
  email: string
  phone: string
  document: string
  zipCode: string
  street: string
  complement: string
  latitude: number
  longitude: number
}
