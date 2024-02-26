import { Injectable } from '@nestjs/common'
import { LoginAuthDto } from './dto/login-auth.dto'
import { validateAuthRepository } from './repositories/validate-auth.repository'
import { loginAuthRepository } from './repositories/login-auth.repository'
import { registerAuthRepository } from './repositories/register-auth.repository'
import { PasswordResetAuthDto } from './dto/password-reset-auth.dto'
import { passwordResetAuthRepository } from './repositories/password-reset-auth.repository'
import { RegisterAuthDto } from './dto/register-auth.dto'

@Injectable()
export class AuthService {
  constructor() {}

  async validateUser(loginAuthDto: LoginAuthDto) {
    return await validateAuthRepository(loginAuthDto)
  }

  async login(loginAuthDto: LoginAuthDto) {
    return await loginAuthRepository(loginAuthDto)
  }

  async register(registerAuthDto: RegisterAuthDto) {
    return await registerAuthRepository(registerAuthDto)
  }

  async passwordReset(passwordResetAuthDto: PasswordResetAuthDto) {
    return await passwordResetAuthRepository(passwordResetAuthDto)
  }
}
