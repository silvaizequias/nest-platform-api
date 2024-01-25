import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readUserRepository = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    if (id) {
      const user = await prisma.user.findFirst({
        where: { id: id, softDeleted: false },
        include: {
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
    }

    return await prisma.user.findMany({
      where: { softDeleted: false },
      select: {
        id: true,
        active: true,
        profile: true,
        image: true,
        name: true,
        phone: true,
        email: true,
        organizations: {
          select: {
            id: true,
            active: true,
            role: true,
            organization: {
              select: {
                id: true,
                image: true,
                name: true,
                phone: true,
                email: true,
                document: true,
                zipCode: true,
                complement: true,
                latitude: true,
                longitude: true,
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
