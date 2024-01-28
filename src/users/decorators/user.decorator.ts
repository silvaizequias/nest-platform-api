import { SetMetadata } from '@nestjs/common'
import { UserProfile } from '@prisma/client'

export const PROFILES_KEY = 'profiles'
export const Profiles = (...profiles: UserProfile[]) =>
  SetMetadata(PROFILES_KEY, profiles)
