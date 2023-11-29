import { Organization } from '@prisma/client'

export class OrganizationEntity implements Organization {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  isActive: boolean
  name: string
  image: string
  email: string
  phone: string
  documentCode: string
  zipCode: string
  street: string
  complement: string
  district: string
  city: string
  state: string
  country: string
  latitude: number
  longitude: number
}
