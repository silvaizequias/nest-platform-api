import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RemoveSubscriptionValidator } from 'src/subscriptions/subscription.validator'

const prisma = new PrismaService()

export async function removeSubscriptionRepository(
  id: string,
  removeSubscriptionValidator: RemoveSubscriptionValidator,
) {
  const { definitely } = removeSubscriptionValidator
  try {
    const subscription = await prisma.subscription.findFirst({
      where: { id: id },
    })
    if (!subscription)
      throw new NotFoundException('A assinatura não foi encontrada!')

    if (definitely) {
      return await prisma.subscription
        .delete({ where: { id: id } })
        .then(() => {
          return JSON.stringify(
            `A assinatura ${subscription?.code ?? ''} foi removida definitivamente da plataforma!`,
          )
        })
    } else {
      return await prisma.subscription
        .update({
          where: { id: id },
          data: {
            softDeleted: true,
            active: false,
          },
        })
        .then((data) => {
          return JSON.stringify(
            `A assinatura ${data?.code ?? ''} foi removida!`,
          )
        })
    }
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
