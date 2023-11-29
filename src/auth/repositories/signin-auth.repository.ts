import { PrismaService } from 'src/prisma/prisma.service'
import { SignInAuthDto } from '../dto/signin-auth.dto'
import {
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common'
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

export const signInAuthRepository = async (signInAuthDto: SignInAuthDto) => {
  const prisma = new PrismaService()
  const jwtService = new JwtService()

  try {
    const { email, password } = signInAuthDto
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        isActive: true,
        profile: true,
        name: true,
        email: true,
        phone: true,
        passHash: true,
        organizations: {
          select: {
            organizationId: true,
            role: true,
          },
        },
      },
    })
    if (!user) throw new NotFoundException('o email está incorreto')

    const comparePassword = compareSync(password, user.passHash)
    if (!comparePassword) throw new ForbiddenException('a senha está incorreta')
    delete user.passHash

    const authorization = await jwtService.signAsync(
      {
        email: email,
        profile: user.profile,
        organizations: user?.organizations,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
      },
      {
        secret: process.env.JWT_SECRET_KEY,
      },
    )

    return {
      authorization,
      expiresIn: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
      ...user,
    }
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
