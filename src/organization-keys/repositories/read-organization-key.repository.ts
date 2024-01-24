import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrganizationKeyRepository = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    if (id) {
      const organizationKey = await prisma.organizationKeys.findFirst({
        where: { id: id },
        include: {
          organization: true,
        },
      })
      if (!organizationKey)
        throw new NotFoundException('nada encontrado por aqui')

      return organizationKey
    }

    return await prisma.organizationKeys.findMany({
      select: {
        id: true,
        active: true,
        expireIn: true,
        organization: true,
      },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
