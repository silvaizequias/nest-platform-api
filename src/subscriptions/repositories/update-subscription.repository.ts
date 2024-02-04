import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto'

export const updateSubscriptionRepository = async (
  id: string,
  updateSubscriptionDto: UpdateSubscriptionDto,
) => {
  const prisma = new PrismaService()

  try {
    delete updateSubscriptionDto?.organizationDocument

    const subscription = await prisma.subscription.findFirst({
      where: { id: id },
    })
    if (!subscription) throw new NotFoundException('assinatura não encontrado')

    await prisma.organization.update({
      where: { id: id },
      data: { ...updateSubscriptionDto },
    })
    return JSON.stringify(`as informações da assinatura foram atualizadas`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
