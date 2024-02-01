import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrganizationByDocumentRepository = async (
  document: string,
) => {
  const prisma = new PrismaService()

  try {
    const organziation = await prisma.organization.findFirst({
      where: { document: document, softDeleted: false },
      include: {
        apiKey: {
          select: {
            active: true,
            expireIn: true,
            authorizationKey: true,
          },
        },
        users: {
          select: {
            id: true,
            active: true,
            role: true,
            user: {
              select: {
                id: true,
                profile: true,
                name: true,
                phone: true,
              },
            },
          },
        },
      },
    })
    if (!organziation) throw new NotFoundException('organização não encontrado')

    return organziation
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
