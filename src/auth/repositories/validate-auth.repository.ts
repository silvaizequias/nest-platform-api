import { HttpException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { LoginAuthDto } from '../dto/login-auth.dto'

export const validateAuthRepository = async (loginAuthDto: LoginAuthDto) => {
  const prisma = new PrismaService()

  try {
    const { phone } = loginAuthDto
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
