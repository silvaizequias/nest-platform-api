import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrganizationRepository = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    if (id) {
      const organziation = await prisma.organization.findFirst({
        where: { id: id, softDeleted: false },
        include: {
          apiKey: {
            select: {
              expireIn: true,
              active: true,
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
      if (!organziation)
        throw new NotFoundException('organização não encontrado')

      return organziation
    }

    return await prisma.organization.findMany({
      where: { id: id, softDeleted: false },
      include: {
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
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
