import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto'
import { emailUpdateSubscription } from 'src/utils/send-messages/templates'
import { sendEmail } from 'src/utils/send-messages'

const prisma = new PrismaService()

export const updateSubscription = async (
  id: string,
  updateSubscriptionDto: UpdateSubscriptionDto,
) => {
  try {
    const { credit, unlimited } = updateSubscriptionDto
    delete updateSubscriptionDto.organizationDocument

    const subscription = await prisma.subscription.findFirst({
      where: { id: id },
    })
    if (!subscription)
      throw new NotFoundException('a assinatura não foi encontrada')

    const organizationId = subscription?.organizationId

    const organization = await prisma.organization.findFirst({
      where: { id: organizationId },
    })
    if (!organization)
      throw new NotFoundException('a organização não foi encontrada')

    const adds: number = subscription?.credit + credit

    await prisma.subscription
      .update({
        where: { id: id },
        data: {
          ...updateSubscriptionDto,
          credit: credit ? adds : subscription?.credit,
        },
      })
      .then(async () => {
        if (!unlimited) {
          const emailMessage = emailUpdateSubscription({
            organization: organization?.name,
            credit: credit,
          })
          await sendEmail({
            body: emailMessage,
            subject: `sua organização recebeu ${credit} créditos`,
            to: organization?.email,
          })
        }
      })

    if (unlimited)
      return JSON.stringify(
        `a organização ${organization?.name} agora possui uma assinatura ilimitada para consumo de recursos da plataforma`,
      )

    return JSON.stringify(
      `a organização ${organization?.name} recebeu ${credit || 0} crétido`,
    )
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
