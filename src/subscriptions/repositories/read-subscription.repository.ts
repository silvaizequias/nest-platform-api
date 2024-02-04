import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readSubscriptionRepository = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    if (id) {
      const subscription = await prisma.subscription.findFirst({
        where: { id: id, softDeleted: false },
        orderBy: { createdAt: 'desc' },
        include: {
          organization: {
            select: {
              id: true,
              name: true,
              document: true,
            },
          },
        },
      })
      if (!subscription)
        throw new NotFoundException('assinatura não encontrada')

      return subscription
    }

    return await prisma.subscription.findMany({
      where: { id: id, softDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            document: true,
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
