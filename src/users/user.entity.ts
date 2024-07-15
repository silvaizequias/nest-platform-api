import { User } from '@prisma/client'

export class UserEntity implements User {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  lastLogin: Date
  role: string
  name: string
  image: string
  email: string
  phone: string
  secret: string
  document: string
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
