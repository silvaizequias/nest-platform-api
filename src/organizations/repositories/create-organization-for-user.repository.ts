import { ConflictException, HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrganizationDto } from '../dto/create-organization.dto'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export const createOrganizationForUser = async (
  userPhone: string,
  createOrganizationDto: CreateOrganizationDto,
) => {
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    const { name, document } = createOrganizationDto
    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (organization)
      throw new ConflictException(
        `a organização ${name} já existe na plataforma`,
      )

    const user = await prisma.user.findFirst({
      where: { phone: userPhone },
    })
    if (!user) {
      const data: Prisma.OrganizationUsersCreateInput = {
        role: 'owner',
        organization: {
          create: createOrganizationDto,
        },
        user: {
          create: {
            profile: 'member',
            name: 'Usuário da ' + name,
            phone: userPhone,
            email: userPhone + '@dedicado.digital',
            passHash: hashSync(randomCode, 10),
          },
        },
      }
      await prisma.organizationUsers.create({ data })
      return JSON.stringify(
        `o usuario foi criado e incluído na organização ${name} como ${data?.role}`,
      )
    }

    const data: Prisma.OrganizationUsersCreateInput = {
      role: 'owner',
      organization: {
        create: createOrganizationDto,
      },
      user: {
        connect: {
          phone: userPhone,
        },
      },
    }
    await prisma.organizationUsers.create({ data })
    return JSON.stringify(
      `a organização ${organization?.name} foi criada tendo você como ${data?.role}`,
    )
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
