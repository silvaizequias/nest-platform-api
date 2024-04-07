import { $Enums, User } from '@prisma/client'

export class UserEntity implements User {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  available: boolean
  profile: $Enums.UserProfile
  accessCode: string
  passHash: string
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
