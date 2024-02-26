import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { LoginAuthDto } from '../dto/login-auth.dto'

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ phone: 'phone' })
  }

  async validate(loginAuthDto: LoginAuthDto): Promise<any> {
    const user = await this.authService.validateUser(loginAuthDto)
    if (!user) throw new UnauthorizedException()
    return user
  }
}
