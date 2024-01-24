import { $Enums, User } from '@prisma/client'

export class UserEntity implements User {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  subscriber: boolean
  suspended: boolean
  accessCode: string
  passHash: string
  profile: $Enums.UserProfile
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
  defaultOrganization: string
}
