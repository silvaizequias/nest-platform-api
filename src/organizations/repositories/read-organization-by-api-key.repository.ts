import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrganizationByApiKeyRepository = async (key: string) => {
  const prisma = new PrismaService()

  try {
    return await prisma.organization.findFirst({
      where: { apiKey: key, softDeleted: false },
      select: {
        isActive: true,
        apiExpireIn: true,
      },
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
