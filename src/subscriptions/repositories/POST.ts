import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateSubscriptionDto } from '../dto/create-subscription.dto'
import { Prisma } from '@prisma/client'
import { SpendSubscriptionDto } from '../dto/spend-subscription.dto'
import { CheckoutSubscriptionDto } from '../dto/checkout-subscription.dto'
import {
  createPaymentCustomer,
  paymentCheckout,
} from 'src/utils/handle-subscriptions'

const prisma = new PrismaService()

export const createSubscription = async (
  createSubscriptionDto: CreateSubscriptionDto,
) => {
  try {
    const { organizationDocument, credit } = createSubscriptionDto
    delete createSubscriptionDto?.organizationDocument

    const organization = await prisma.organization.findFirst({
      where: { document: organizationDocument },
    })
    if (!organization)
      throw new NotFoundException('a organização não foi encontrada')

    if (credit < 100)
      throw new HttpException(`o valor ${credit} não é aceitável`, 400)

    const paymentCustomerId = await createPaymentCustomer({
      name: organization?.name,
      email: organization?.email,
      phone: organization?.phone,
      document: organizationDocument,
      zipCode: organization?.zipCode,
      street: organization?.street,
      complement: organization?.complement,
    }).then((data) => data.id)

    const data: Prisma.SubscriptionCreateInput = {
      ...createSubscriptionDto,
      paymentCustomerId: paymentCustomerId,
      organization: {
        connect: {
          document: organizationDocument,
        },
      },
    }
    await prisma.subscription.create({ data })
    return JSON.stringify(
      `foi adicionado ${credit} créditos para a ${organization?.name}`,
    )
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const spendSubscription = async (
  spendSubscriptionDto: SpendSubscriptionDto,
) => {
  try {
    const { authorizationKey, spend } = spendSubscriptionDto
    const organization = await prisma.organization.findFirst({
      where: { authorizationKey: authorizationKey },
    })
    if (!organization)
      throw new NotFoundException('a organização não foi encontrada')

    const organizationId = organization?.id

    const subscription = await prisma.subscription.findFirst({
      where: { organizationId: organizationId },
    })
    if (!subscription)
      throw new NotFoundException('a assinatura não foi encontrada')

    const unlimited: boolean = subscription?.unlimited

    if (unlimited) return true

    const credits: number = subscription?.credit
    if (credits <= 0)
      throw new HttpException('a assinatura não possui saldo disponível', 400)

    const debit: number = credits - spend

    await prisma.subscription
      .update({
        where: { id: subscription?.id },
        data: { credit: debit },
      })
      .then(() => {
        return true
      })

    return true
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const checkoutSubscription = async (
  checkoutSubscriptionDto: CheckoutSubscriptionDto,
) => {
  try {
    const { credit, document, url } = checkoutSubscriptionDto
    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (!organization)
      throw new NotFoundException('a organização não foi encontrada')

    const organizationId = organization?.id

    const subscription = await prisma.subscription.findFirst({
      where: { organizationId: organizationId },
    })
    if (!subscription)
      throw new NotFoundException('a assinatura não foi encontrada')

    if (credit < 100)
      throw new HttpException(`o valor ${credit} não é aceitável`, 400)

    return await paymentCheckout({
      credit: credit,
      document: document,
      paymentCustomerId: subscription?.paymentCustomerId,
      subscriptionId: subscription?.id,
      url: url,
    })
      .then((data) => data)
      .catch((error) => error)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
