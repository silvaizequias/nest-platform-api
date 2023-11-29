import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { SignInAuthDto } from '../dto/signin-auth.dto'

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ email: 'email' })
  }

  async validate(signInAuthDto: SignInAuthDto): Promise<any> {
    const user = await this.authService.validateUser(signInAuthDto)
    if (!user) throw new UnauthorizedException()
    return user
  }
}
