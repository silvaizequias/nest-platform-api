import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function findByCodeSubscriptionRepository(code: string) {
  try {
    const subscription = await prisma.subscription.findFirst({
      where: { code: code },
      include: { organization: true },
    })
    if (!subscription)
      throw new NotFoundException('A assinatura ${code} não foi encontrada!')

    return subscription
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findByOrganizationSubscriptionRepository(
  document: string,
) {
  try {
    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    return await prisma.subscription.findFirst({
      where: { organizationId: organization?.id },
      include: { organization: true },
    })
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findManySubscriptionRepository() {
  try {
    return await prisma.subscription.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: { organization: true },
    })
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
      include: { organization: true },
    })
    if (!subscription)
      throw new NotFoundException('A assinatura não foi encontrada!')

    return subscription
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
