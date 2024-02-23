import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { PROFILES_KEY } from 'src/users/decorators/user.decorator'
import { UserProfileEnum } from 'src/users/users.enumerator'

@Injectable()
export class ProfileAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredProfile = this.reflector.getAllAndOverride<UserProfileEnum[]>(
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
