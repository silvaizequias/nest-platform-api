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
import { emailNewOrganization } from 'src/utils/send-messages/templates'
import { createPaymentCustomer } from 'src/utils/handle-subscriptions'

const prisma = new PrismaService()
const randomKey = 'dp.' + randomBytes(32).toString('hex')

export const createOrganization = async (
  createOrganizationDto: CreateOrganizationDto,
) => {
  try {
    const { email, name, phone, document, zipCode, complement } =
      createOrganizationDto
    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (organization)
      throw new ConflictException(
        `a organização ${name} já existe na plataforma`,
      )

    const address: AddressByZipCodeType = await getAddressByZipCode(zipCode)

    const paymentCustomerId = await createPaymentCustomer({
      name: name,
      email: email,
      phone: phone,
      document: document,
      zipCode: zipCode,
      street: address?.address,
      complement: complement,
      city: address?.city,
      state: address?.state,
    }).then((data) => data.id)

    const data: Prisma.OrganizationCreateInput = {
      ...createOrganizationDto,
      authorizationKey: randomKey,
      street: address?.address || null,
      latitude: Number(address?.lat) || null,
      longitude: Number(address?.lng) || null,
      subscription: {
        create: {
          paymentCustomerId: paymentCustomerId,
          credit: 100,
          unlimited: false,
        },
      },
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
    const { email, name, document, zipCode, complement } = createOrganizationDto

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

    const paymentCustomerId = await createPaymentCustomer({
      name: name,
      email: email,
      phone: createOrganizationDto?.phone,
      document: document,
      zipCode: zipCode,
      street: address?.address,
      complement: complement,
      city: address?.city,
      state: address?.state,
    }).then((data) => data.id)

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
          subscription: {
            create: {
              paymentCustomerId: paymentCustomerId,
              credit: 100,
              unlimited: false,
            },
          },
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
