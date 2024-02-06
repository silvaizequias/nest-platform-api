import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateSubscriptionDto } from '../dto/create-subscription.dto'
import { Prisma } from '@prisma/client'

export const createSubscriptionRepository = async (
  createSubscriptionDto: CreateSubscriptionDto,
) => {
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  try {
    const { code, organizationDocument } = createSubscriptionDto
    delete createSubscriptionDto?.organizationDocument

    const organization = await prisma.organization.findFirst({
      where: { document: organizationDocument, softDeleted: false },
    })
    if (!organization) throw new NotFoundException('organização não encontrado')

    const data: Prisma.SubscriptionCreateInput = {
      ...createSubscriptionDto,
      code: code || randomCode,
      organization: {
        connect: {
          document: organizationDocument,
        },
      },
    }

    return await prisma.subscription.create({ data })
  } catch (error) {
    console.log(error)
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
