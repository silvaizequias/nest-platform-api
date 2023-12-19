import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrganizationRepository = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    if (id) {
      return await prisma.organization.findFirst({
        where: { id: id, softDeleted: false },
        include: {
          users: {
            select: {
              id: true,
              role: true,
              isActive: true,
              user: {
                select: {
                  id: true,
                  profile: true,
                  isActive: true,
                  name: true,
                  image: true,
                  email: true,
                  phone: true,
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

    return await prisma.organization.findMany({
      where: { softDeleted: false },
      select: {
        id: true,
        isActive: true,
        image: true,
        name: true,
        phone: true,
        email: true,
        documentCode: true,
        zipCode: true,
        complement: true,
        latitude: true,
        longitude: true,
        users: {
          select: {
            id: true,
            role: true,
            isActive: true,
            user: {
              select: {
                id: true,
                profile: true,
                isActive: true,
                name: true,
                image: true,
                email: true,
                phone: true,
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
