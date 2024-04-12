import { PrismaService } from 'src/prisma/prisma.service'
import { DeleteSubscriptionDto } from '../dto/delete-subscription.dto'
import { HttpException, NotFoundException } from '@nestjs/common'

const prisma = new PrismaService()

export const removeSubscription = async (
  id: string,
  deleteSubscriptionDto: DeleteSubscriptionDto,
) => {
  try {
    const { definitely } = deleteSubscriptionDto

    const subscription = await prisma.subscription.findFirst({
      where: { id: id },
    })
    if (!subscription)
      throw new NotFoundException('a assinatura não foi encontrado')

    if (!definitely) {
      await prisma.subscription.update({
        where: { id: id },
        data: {
          softDeleted: true,
        },
      })
      return JSON.stringify(`a assinatura foi removida da organização`)
    } else {
      await prisma.subscription.delete({
        where: { id: id },
      })
      return JSON.stringify(
        `a assinatura foi removida definitivamente da organização`,
      )
    }
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
