import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES_KEY } from './users.decorator'
import { UsersRoleEnum } from './users.enumerator'

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<UsersRoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )
    if (!requiredRole) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    return requiredRole.some((role) => user.role?.includes(role))
  }
}
