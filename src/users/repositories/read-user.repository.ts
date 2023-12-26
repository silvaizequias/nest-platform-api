import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readUserRepository = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    if (id) {
      return await prisma.user.findFirst({
        where: { id: id, softDeleted: false },
        include: {
          organizations: {
            select: {
              id: true,
              isActive: true,
              role: true,
              organization: {
                select: {
                  id: true,
                  image: true,
                  name: true,
                  phone: true,
                  email: true,
                  documentCode: true,
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
    }

    return await prisma.user.findMany({
      where: { softDeleted: false },
      select: {
        id: true,
        isActive: true,
        profile: true,
        image: true,
        name: true,
        phone: true,
        email: true,
        organizations: {
          select: {
            id: true,
            isActive: true,
            role: true,
            organization: {
              select: {
                id: true,
                image: true,
                name: true,
                phone: true,
                email: true,
                documentCode: true,
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
