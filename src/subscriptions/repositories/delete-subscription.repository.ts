import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const deleteSubscriptionRepository = async (id: string) => {
  const prisma = new PrismaService()

  try {
    const subscription = await prisma.subscription.findFirst({
      where: { id: id },
    })
    if (!subscription)
      throw new NotFoundException('nada foi encontrado por aqui')

    await prisma.subscription.delete({
      where: { id: id },
    })
    return JSON.stringify(`a assinatura foi removido da organização`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
