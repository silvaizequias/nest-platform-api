import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateSubscriptionValidator } from 'src/subscriptions/subscription.validator'

const prisma = new PrismaService()

export async function createSubscriptionRepository(
  createSubscriptionValidator: CreateSubscriptionValidator,
) {
  const { credit, organizationId } = createSubscriptionValidator
  try {
    const organization = await prisma.organization.findFirst({
      where: { id: organizationId },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    if (credit < 100)
      throw new HttpException(`O valor ${credit} não é aceitável`, 400)

    return await prisma.subscription
      .create({
        data: {
          ...createSubscriptionValidator,
        },
      })
      .then((data) => {
        return JSON.stringify(
          `A assinatura ${data?.code} foi criada e adicionado ${credit} créditos para a ${organization?.name ?? ''!}`,
        )
      })
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
