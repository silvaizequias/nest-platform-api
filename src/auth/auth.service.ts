import { Injectable } from '@nestjs/common'
import { SignInAuthDto } from './dto/signin-auth.dto'
import { validateAuthRepository } from './repositories/validate-auth.repository'
import { signInAuthRepository } from './repositories/signin-auth.repository'
import { SignUpAuthDto } from './dto/signup-auth.dto'
import { signUpAuthRepository } from './repositories/signup-auth.repository'
import { PasswordResetAuthDto } from './dto/password-reset-auth.dto'
import { passwordResetAuthRepository } from './repositories/password-reset-auth.repository'

@Injectable()
export class AuthService {
  constructor() {}

  async validateUser(signInAuthDto: SignInAuthDto) {
    return await validateAuthRepository(signInAuthDto)
  }

  async signIn(signInAuthDto: SignInAuthDto) {
    return await signInAuthRepository(signInAuthDto)
  }

  async signUp(signUpAuthDto: SignUpAuthDto) {
    return await signUpAuthRepository(signUpAuthDto)
  }

  async passwordReset(passwordResetAuthDto: PasswordResetAuthDto) {
    return await passwordResetAuthRepository(passwordResetAuthDto)
  }
}
