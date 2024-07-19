import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateSubscriptionValidator } from 'src/subscriptions/subscription.validator'

const prisma = new PrismaService()

export async function updateSubscriptionRepository(
  id: string,
  updateSubscriptionValidator: UpdateSubscriptionValidator,
) {
  const { credit, unlimited } = updateSubscriptionValidator
  try {
    const subscription = await prisma.subscription.findFirst({
      where: { id: id },
      include: { organization: true },
    })
    if (!subscription)
      throw new NotFoundException('A assinatura não foi encontrada!')

    const adds: number = subscription?.credit + credit

    return await prisma.subscription
      .update({
        where: { id: id },
        data: {
          ...updateSubscriptionValidator,
          credit: credit ? adds : subscription?.credit,
        },
      })
      .then((data) => {
        return unlimited
          ? JSON.stringify(
              `A organização ${subscription?.organization?.name} agora possui uma assinatura ilimitada para consumo de recursos da plataforma!`,
            )
          : JSON.stringify(
              `As informações da assinatura ${data?.code ?? ''} da organização ${subscription?.organization?.name} foram atualizadas!`,
            )
      })
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
