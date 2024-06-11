import { SetMetadata } from '@nestjs/common'
import { UsersRoleEnum } from './users.enumerator'

export const ROLES_KEY = 'roles'
export const Profiles = (...roles: UsersRoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles)
