import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { UsersEnumerator } from 'src/users/users.enumerator'
import { PROFILES_KEY } from './users.decorator'

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredProfile = this.reflector.getAllAndOverride<UsersEnumerator[]>(
      PROFILES_KEY,
      [context.getHandler(), context.getClass()],
    )
    if (!requiredProfile) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    return requiredProfile.some((profile) => user.profile?.includes(profile))
  }
}
