import {
  ConflictException,
  HttpException,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { randomBytes } from 'crypto'
import { CreateOrganizationValidator } from 'src/organizations/organization.validator'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function createOrganizationRepository(
  createOrganizationValidator: CreateOrganizationValidator,
) {
  const { document } = createOrganizationValidator
  const keyGenerator = 'dp.' + randomBytes(32).toString('hex')
  try {
    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (organization)
      throw new ConflictException(
        `Não é possível criar uma organização com esse documento ${document}!`,
      )

    return await prisma.organization
      .create({
        data: { ...createOrganizationValidator, key: keyGenerator },
      })
      .then((data) => {
        return JSON.stringify(
          `A organização ${data?.name ?? ''} foi criada na plataforma!`,
        )
      })
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function createOrganizationForUserRepository(
  userId: string,
  createOrganizationValidator: CreateOrganizationValidator,
) {
  const { document, name } = createOrganizationValidator
  try {
    const user = await prisma.user.findFirst({ where: { id: userId } })
    if (!user) throw new NotFoundException('O usuário não foi encontrado!')

    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (organization)
      throw new ConflictException(
        `Não é possível criar uma organização com esse documento ${document}!`,
      )

    const data: Prisma.MembershipCreateInput = {
      role: 'owner',
      organization: {
        create: { ...createOrganizationValidator },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    }

    return await prisma.membership
      .create({
        data,
      })
      .then(() => {
        return JSON.stringify(
          `A sua organização ${name ?? ''} foi criada na plataforma!`,
        )
      })
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
