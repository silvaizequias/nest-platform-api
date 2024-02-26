import { PrismaService } from 'src/prisma/prisma.service'
import { LoginAuthDto } from '../dto/login-auth.dto'
import {
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common'
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

export const loginAuthRepository = async (loginAuthDto: LoginAuthDto) => {
  const prisma = new PrismaService()
  const jwtService = new JwtService()

  try {
    const { phone, password } = loginAuthDto
    const user = await prisma.user.findFirst({
      where: { phone: phone },
      select: {
        id: true,
        active: true,
        subscriber: true,
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
    delete user.passHash

    const authorization = await jwtService.signAsync(
      {
        phone: phone,
        profile: user.profile,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      },
      {
        secret: process.env.JWT_SECRET_KEY,
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
