import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readSubscriptionByCodeRepository = async (code: string) => {
  const prisma = new PrismaService()

  try {
    const subscription = await prisma.subscription.findMany({
      where: { code: code, softDeleted: false },
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
    if (!subscription) throw new NotFoundException('assinatura não encontrada')

    return subscription
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
