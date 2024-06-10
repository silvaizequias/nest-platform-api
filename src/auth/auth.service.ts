import { HttpException, Injectable } from '@nestjs/common'
import { AuthLoginDto } from './auth.dto'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const { phone } = authLoginDto
    try {
      const token = await this.jwtService.signAsync(
        {
          phone: phone,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
        },
        {
          secret: this.configService.getOrThrow('SECRET'),
        },
      )

      return {
        token,
        expiresIn: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      }
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }
}
