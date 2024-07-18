import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateSubscriptionValidator } from 'src/subscriptions/subscription.validator'

const prisma = new PrismaService()

export async function createSubscriptionRepository(
  createSubscriptionValidator: CreateSubscriptionValidator,
) {
  const { organizationId } = createSubscriptionValidator
  try {
    const organization = await prisma.organization.findFirst({
      where: { id: organizationId },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    return createSubscriptionValidator
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
