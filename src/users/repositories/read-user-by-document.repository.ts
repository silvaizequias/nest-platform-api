import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readUserByDocumentRepository = async (document: string) => {
  const prisma = new PrismaService()

  try {
    const user = await prisma.user.findFirst({
      where: { document: document, softDeleted: false },
      select: {
        id: true,
        active: true,
        profile: true,
        image: true,
        name: true,
        phone: true,
        organizations: {
          select: {
            role: true,
            organization: {
              select: {
                id: true,
                name: true,
                document: true,
              },
            },
          },
        },
      },
    })
    if (!user) throw new NotFoundException('usuário não encontrado')

    return user
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
