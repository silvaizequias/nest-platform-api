import {
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrganizationKeyDto } from '../dto/create-organization-key.dto'
import { randomBytes } from 'crypto'
import { Prisma } from '@prisma/client'

export const createOrganizationKeyRepository = async (
  createOrganizationKeyDto: CreateOrganizationKeyDto,
) => {
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
