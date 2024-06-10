import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JsonWebTokenError } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class AuthJWTGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('token inválido')
    }

    return super.handleRequest(err, user, info, context, status)
  }
}

@Injectable()
export class AuthApiKeyGuard extends AuthGuard('apiKey') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    return super.handleRequest(err, user, info, context, status)
  }
}
