import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export const findSubscriptions = async () => {
  try {
    return await prisma.subscription.findMany({
      include: {
        organization: {
          select: {
            id: true,
            active: true,
            name: true,
            image: true,
            email: true,
            phone: true,
            document: true,
          },
        },
      },
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findSubscriptionById = async (id: string) => {
  try {
    return await prisma.subscription.findFirst({
      where: { id: id },
      include: {
        organization: true,
      },
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findSubscriptionByOrganization = async (document: string) => {
  try {
    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (!organization)
      throw new NotFoundException('a organziação não foi encontrada')

    const organizationId = organization?.id

    const subscription = await prisma.subscription.findFirst({
      where: { organizationId: organizationId },
    })
    if (!subscription)
      throw new NotFoundException('não existe assinatura para esta organização')

    return subscription
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
