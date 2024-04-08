import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { hashSync } from 'bcryptjs'
import { Prisma } from '@prisma/client'
import { LoginUserDto } from '../dto/login-user.dto'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcryptjs'
import { getAddressByZipCode } from 'src/utils/handle-address'
import { AddressByZipCodeType } from 'src/utils/handle-address/types'
import {
  emailWelcomeToThePlatform,
  smsWelcomeToThePlatform,
} from 'src/utils/send-messages/templates'
import { sendEmail, sendSms } from 'src/utils/send-messages'

export const createUser = async (createUserDto: CreateUserDto) => {
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  try {
    const { name, email, phone, password, zipCode } = createUserDto
    delete createUserDto.password

    const userPhone = await prisma.user.findFirst({
      where: { phone: phone },
    })
    if (userPhone)
      throw new ConflictException(
        `não foi possível registrar-se com o número ${phone}`,
      )

    const userEmail = await prisma.user.findFirst({
      where: { email: email },
    })
    if (userEmail)
      throw new ConflictException(
        `não foi possível registrar-se com o email ${email}`,
      )

    const setPassword = password || randomCode

    const address: AddressByZipCodeType = await getAddressByZipCode(zipCode)

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      passHash: hashSync(setPassword, 10),
      street: address?.address || null,
      latitude: Number(address?.lat) || null,
      longitude: Number(address?.lng) || null,
    }

    await prisma.user
      .create({ data })
      .then(async () => {
        const emailMessage = emailWelcomeToThePlatform({
          name: name,
          password: setPassword,
          phone: phone,
        })
        email &&
          (await sendEmail({
            body: emailMessage,
            subject: 'boas vindas a sua melhor plataforma de serviços',
            to: email,
          }))
        const smsMessage = smsWelcomeToThePlatform({
          name: name,
          password: setPassword,
        })
        phone && (await sendSms({ content: smsMessage, to: phone }))
      })
      .catch((error: any) => console.log(error))

    return JSON.stringify(
      `${name} agora faz parte da melhor plataforma de serviços`,
    )
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const login = async (loginUserDto: LoginUserDto) => {
  const prisma = new PrismaService()
  const jwtService = new JwtService()

  try {
    const { phone, password } = loginUserDto
    const user = await prisma.user.findFirst({
      where: { phone: phone, softDeleted: false },
      select: {
        softDeleted: true,
        id: true,
        active: true,
        profile: true,
        name: true,
        email: true,
        phone: true,
        passHash: true,
      },
    })
    if (!user) throw new NotFoundException('o número de celular está incorreto')

    const comparePassword = compareSync(password, user.passHash)
    if (!comparePassword) throw new ForbiddenException('a senha está incorreta')

    if (!user?.active)
      throw new BadRequestException(
        'seu acesso a plataforma está temporariamente suspenso',
      )

    delete user.passHash

    const authorization = await jwtService.signAsync(
      {
        phone: phone,
        profile: user.profile,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      },
      {
        secret: process.env.SECRET,
      },
    )

    return {
      authorization,
      expiresIn: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      ...user,
    }
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
