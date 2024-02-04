import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrganizationKeyByKeyRepository = async (
  authorizationKey: string,
) => {
  const prisma = new PrismaService()

  try {
    const organizationKey = await prisma.organizationKeys.findFirst({
      where: { authorizationKey: authorizationKey },
      select: {
        active: true,
        expireIn: true,
        organization: {
          select: {
            id: true,
            document: true,
          },
        },
      },
    })
    if (!organizationKey)
      throw new NotFoundException('chave de autorização inativa')

    return organizationKey
  } catch (error: any) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
