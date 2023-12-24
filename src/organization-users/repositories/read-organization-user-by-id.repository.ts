import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrganizationUserByIdRepository = async (id: string) => {
  const prisma = new PrismaService()

  try {
    return await prisma.organizationUsers.findFirst({
      where: { userId: id, isActive: true },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        role: true,
        organization: {
          select: {
            id: true,
            isActive: true,
            name: true,
            image: true,
            email: true,
            phone: true,
            documentCode: true,
            zipCode: true,
            street: true,
            complement: true,
            district: true,
            city: true,
            state: true,
            country: true,
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
