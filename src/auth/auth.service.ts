import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthLoginValidator } from './auth.validator'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compareSync, hashSync } from 'bcryptjs'
import { SendersService } from 'src/senders/senders.service'
import { UsersService } from 'src/users/users.service'
import { CreateUserValidator } from 'src/users/user.validator'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly sendersService: SendersService,
    private readonly usersService: UsersService,
  ) {}

  async login(authLoginValidator: AuthLoginValidator) {
    const { phone, code } = authLoginValidator
    const issuedAt: number = Math.floor(Date.now() / 1000) - 30
    const expiresIn: number = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60

    try {
      const user = await this.usersService.findByPhone(phone)
      if (!user) throw new NotFoundException(`Usuário não encontrado!`)

      const secret = user?.secret

      const validation = compareSync(code.toLocaleUpperCase(), secret)
      if (!validation)
        throw new UnauthorizedException(
          `O código para autenticação é inválido!`,
        )

      const token = await this.jwtService.signAsync(
        {
          id: user?.id,
          iat: issuedAt,
          exp: expiresIn,
        },
        {
          secret: this.configService.getOrThrow('SECRET'),
        },
      )

      const payload = {
        expiresIn: expiresIn,
        id: user?.id,
        token,
      }

      return await this.usersService
        .update(user?.id, { lastLogin: new Date() })
        .then(() => payload)
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  async validate(phone: string) {
    const code = Math.random().toString(32).substr(2, 6).toUpperCase()
    const secret: string = hashSync(code, 10)

    const message = `PLATAFORMA DEDICADO: utilize o código ${code} para autenticar.`

    const createUserValidator: CreateUserValidator = null

    try {
      if (!phone) throw new BadRequestException('phone is required')

      const user = await this.usersService.findByPhone(phone)
      if (!user) {
        return await this.usersService
          .create({
            ...createUserValidator,
            phone: phone,
            secret: secret,
          })
          .then(
            async () =>
              await this.sendersService.sendSMS({
                to: phone,
                message: message,
              }),
          )
      }

      return await this.usersService
        .update(user?.id, {
          secret: secret,
        })
        .then(
          async () =>
            await this.sendersService.sendSMS({
              to: phone,
              message: message,
            }),
        )
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }
}
