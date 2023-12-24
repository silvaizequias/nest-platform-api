import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrganizationByDocumentRepository = async (
  document: string,
) => {
  const prisma = new PrismaService()

  try {
    return await prisma.organization.findFirst({
      where: { documentCode: document, softDeleted: false },
      include: {
        users: {
          select: {
            id: true,
            role: true,
            isActive: true,
            user: {
              select: {
                id: true,
                isActive: true,
                profile: true,
                image: true,
                name: true,
                phone: true,
                email: true,
              },
            },
          },
        },
      },
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
