import {
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrganizationKeyDto } from '../dto/create-organization-key.dto'
import { randomBytes } from 'crypto'
import { Prisma } from '@prisma/client'
import { NotificationsService } from 'src/notifications/notifications.service'

export const createOrganizationKeyRepository = async (
  createOrganizationKeyDto: CreateOrganizationKeyDto,
) => {
  const notification = new NotificationsService()
  const prisma = new PrismaService()

  try {
    const { organizationDocument } = createOrganizationKeyDto
    delete createOrganizationKeyDto.organizationDocument

    const organization = await prisma.organization.findFirst({
      where: { document: organizationDocument },
    })
    if (!organization)
      throw new NotFoundException('a organização não foi encontrada')

    const organziationKey = await prisma.organizationKeys.findFirst({
      where: {
        organizationId: organization?.id,
      },
    })
    if (organziationKey)
      throw new UnauthorizedException(
        `a organziação ${organization?.name} já possui uma chave de autorização`,
      )

    const authorizationKey = randomBytes(32).toString('hex')

    const data: Prisma.OrganizationKeysCreateInput = {
      ...createOrganizationKeyDto,
      authorizationKey: authorizationKey,
      organization: {
        connect: {
          document: organizationDocument,
        },
      },
    }
    await prisma.organizationKeys.create({ data })

    const message = `
        <p>Olá membro da ${organization?.name}!</p>
        <p>A sua organização agora possui uma chave única de acesso aos serviços da dedicado: <strong>${authorizationKey}</strong></p>
        <p>A chave expira de acordo com o ciclo de utilização dos serviços contratados conosco, mas é revalidada automaticamente através da plataforma</p>
        <p>Salve esta informação pois essa chave é intransferível, de modo que a sua utilização reflete no consumo de recursos de seu plano contratado conosco.</p>
        </br>
        <p>É um prazer ter você por aqui!</p>
        `
    notification.sendEmail({
      to: `${organization?.email}`,
      from: { name: 'dedicado', email: 'master@dedicado.digital' },
      subject: 'chave de autenticação da organização',
      text: message,
      html: message,
    })

    return JSON.stringify(
      `a chave de autorização para conexão da ${organization?.name} foi criada`,
    )
  } catch (error: any) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
