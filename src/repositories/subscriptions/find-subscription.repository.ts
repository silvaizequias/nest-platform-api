import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function findByOrganizationSubscriptionRepository(
  organizationId: string,
) {
  try {
    const organization = await prisma.organization.findFirst({
      where: { id: organizationId },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    return organizationId
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findManySubscriptionRepository() {
  try {
    return []
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findOneSubscriptionRepository(id: string) {
  try {
    const subscription = await prisma.subscription.findFirst({
      where: { id: id },
    })
    if (!subscription)
      throw new NotFoundException('A assinatura não foi encontrada!')

    return id
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
