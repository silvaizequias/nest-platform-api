import { HttpException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { SignInAuthDto } from '../dto/signin-auth.dto'

export const validateAuthRepository = async (signInAuthDto: SignInAuthDto) => {
  const prisma = new PrismaService()

  try {
    const { phone } = signInAuthDto
    const user = await prisma.user.findFirst({
      where: { phone: phone },
      select: {
        id: true,
        active: true,
        profile: true,
        name: true,
        email: true,
        phone: true,
        organizations: true,
      },
    })
    if (user) {
      const { ...result } = user
      return result
    }
    throw new UnauthorizedException()
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
