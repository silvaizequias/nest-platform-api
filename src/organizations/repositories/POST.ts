import { emailNewOrganization } from './../../utils/send-messages/templates/index'
import {
  ConflictException,
  HttpException,
  NotFoundException,
} from '@nestjs/common'
import { randomBytes } from 'crypto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { CreateOrganizationDto } from 'src/organizations/dto/create-organization.dto'
import { getAddressByZipCode } from 'src/utils/handle-address'
import { AddressByZipCodeType } from 'src/utils/handle-address/types'
import { sendEmail } from 'src/utils/send-messages'

const prisma = new PrismaService()
const randomKey = 'dp.' + randomBytes(32).toString('hex')

export const createOrganization = async (
  createOrganizationDto: CreateOrganizationDto,
) => {
  try {
    const { email, name, document, zipCode } = createOrganizationDto
    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (organization)
      throw new ConflictException(
        `a organização ${name} já existe na plataforma`,
      )

    const address: AddressByZipCodeType = await getAddressByZipCode(zipCode)

    const data: Prisma.OrganizationCreateInput = {
      ...createOrganizationDto,
      authorizationKey: randomKey,
      street: address?.address || null,
      latitude: Number(address?.lat) || null,
      longitude: Number(address?.lng) || null,
    }
    await prisma.organization.create({ data }).then(async () => {
      const emailMessage = emailNewOrganization({
        name: '',
        organization: name,
      })
      await sendEmail({
        body: emailMessage,
        subject: `sua organização ${name.toLowerCase()} foi criada`,
        to: email,
      })
    })

    return JSON.stringify(`a organização ${name} agora faz parte da plataforma`)
  } catch (error: any) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const createMyOrganization = async (
  phone: string,
  createOrganizationDto: CreateOrganizationDto,
) => {
  try {
    const { email, name, document, zipCode } = createOrganizationDto

    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (organization)
      throw new ConflictException(
        `a organização ${name} já existe na plataforma`,
      )

    const user = await prisma.user.findFirst({
      where: { phone: phone },
    })
    if (!user) throw new NotFoundException('usuário não encontrado')

    const address: AddressByZipCodeType = await getAddressByZipCode(zipCode)

    const data: Prisma.MemberCreateInput = {
      role: 'owner',
      active: true,
      organization: {
        create: {
          ...createOrganizationDto,
          authorizationKey: randomKey,
          street: address?.address || null,
          latitude: Number(address?.lat) || null,
          longitude: Number(address?.lng) || null,
        },
      },
      user: {
        connect: {
          phone: phone,
        },
      },
    }
    await prisma.member.create({ data }).then(async () => {
      const emailMessage = emailNewOrganization({
        name: user?.name,
        organization: name,
      })
      await sendEmail({
        body: emailMessage,
        subject: `${user?.name.toLowerCase()} sua organização ${name.toLowerCase()} foi criada`,
        to: email,
      })
    })

    return JSON.stringify(
      `a sua organização ${name} agora faz parte da plataforma`,
    )
  } catch (error: any) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
