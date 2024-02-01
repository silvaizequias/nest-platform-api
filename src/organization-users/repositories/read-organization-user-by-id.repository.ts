import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrganizationUserByIdRepository = async (id: string) => {
  const prisma = new PrismaService()

  try {
    const organizationUser = await prisma.organizationUsers.findMany({
      where: { userId: id, active: true },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        active: true,
        role: true,
        organization: {
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
                role: true,
                active: true,
                user: {
                  select: {
                    id: true,
                    active: true,
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
    if (!organizationUser)
      throw new NotFoundException('nada foi encontrado por aqui')

    return organizationUser
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
