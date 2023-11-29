import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrganizationUserRepository = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    if (id) {
      return await prisma.organizationUsers.findFirst({
        where: { id: id },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          isActive: true,
          role: true,
          organization: {
            select: {
              id: true,
              name: true,
              image: true,
              email: true,
              phone: true,
              documentCode: true,
              zipCode: true,
              complement: true,
              latitude: true,
              longitude: true,
            },
          },
          user: {
            select: {
              id: true,
              profile: true,
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
      })
    }

    return await prisma.organizationUsers.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        role: true,
        organization: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
            phone: true,
            documentCode: true,
            zipCode: true,
            complement: true,
            latitude: true,
            longitude: true,
          },
        },
        user: {
          select: {
            id: true,
            profile: true,
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
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
