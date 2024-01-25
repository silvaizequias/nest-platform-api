import {
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrganizationUserDto } from '../dto/create-organization-user.dto'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export const createOrganizationUserRepository = async (
  createOrganizationUserDto: CreateOrganizationUserDto,
) => {
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    const { userPhone, organizationDocument, role } = createOrganizationUserDto
    delete createOrganizationUserDto?.userPhone
    delete createOrganizationUserDto?.organizationDocument

    const organization = await prisma.organization.findFirst({
      where: { document: organizationDocument },
    })
    if (!organization)
      throw new NotFoundException('a organização não foi encontrada')

    const user = await prisma.user.findFirst({
      where: { phone: userPhone },
    })
    if (!user) {
      const data: Prisma.OrganizationUsersCreateInput = {
        ...createOrganizationUserDto,
        organization: {
          connect: {
            document: organizationDocument,
          },
        },
        user: {
          create: {
            profile: 'member',
            name: 'Usuário da ' + organization?.name?.split(' ')[0],
            phone: userPhone,
            email: userPhone + '@dedicado.digital',
            passHash: hashSync(randomCode, 10),
          },
        },
      }
      await prisma.organizationUsers.create({ data })
      return JSON.stringify(
        `o usuario foi criado e incluído na organização ${organization?.name} como ${role}`,
      )
    }

    const organizationUser = await prisma.organizationUsers.findFirst({
      where: { userId: user?.id },
    })
    if (organizationUser && organizationUser.organizationId == organization.id)
      throw new ForbiddenException(
        `${user?.name} já está como ${organizationUser?.role} na organização ${organization?.name}`,
      )

    const data: Prisma.OrganizationUsersCreateInput = {
      ...createOrganizationUserDto,
      role: role || 'client',
      user: {
        connect: {
          phone: userPhone,
        },
      },
      organization: {
        connect: {
          document: organizationDocument,
        },
      },
    }
    await prisma.organizationUsers.create({ data })

    return JSON.stringify(
      `o usuário ${user?.name} agora faz parte da organização ${organization?.name}`,
    )
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
