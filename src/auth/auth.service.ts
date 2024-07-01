import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import { AuthCodeDto, AuthLoginDto } from './auth.dto'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { hashSync } from 'bcryptjs'
import { SendersService } from 'src/senders/senders.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly sendersService: SendersService,
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

      const payload = {
        token,
        expiresIn: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      }

      return payload
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  async code(authCodeDto: AuthCodeDto) {
    const code = Math.random().toString(32).substr(2, 6).toUpperCase()
    const { phone } = authCodeDto

    try {
      if (!phone) throw new BadRequestException('phone is required')

      const message = `PLATAFORMA DEDICADO: utilize o código ${code} para autenticar.`

      const secret: string = hashSync(code, 10)
      console.log(secret)

      return this.sendersService.sendSMS({
        to: phone,
        message: message,
      })
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }
}
