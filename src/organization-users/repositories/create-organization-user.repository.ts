import {
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrganizationUserDto } from '../dto/create-organization-user.dto'
import { Prisma } from '@prisma/client'

export const createOrganizationUserRepository = async (
  createOrganizationUserDto: CreateOrganizationUserDto,
) => {
  const prisma = new PrismaService()

  try {
    const { userEmail, organizationCode, role } = createOrganizationUserDto
    delete createOrganizationUserDto?.userEmail
    delete createOrganizationUserDto?.organizationCode

    const user = await prisma.user.findFirst({
      where: { email: userEmail },
    })
    if (!user) throw new NotFoundException('o usuario não foi encontrado')

    const organization = await prisma.organization.findFirst({
      where: { documentCode: organizationCode },
    })
    if (!organization)
      throw new NotFoundException('a organização não foi encontrada')

    const organizationUser = await prisma.organizationUsers.findFirst({
      where: { userId: user?.id },
    })
    if (organizationUser && organizationUser.organizationId == organization.id)
      throw new ForbiddenException(
        `${user?.name} já está como ${organizationUser?.role} na organização ${organization?.name}`,
      )

    const data: Prisma.OrganizationUsersCreateInput = {
      ...createOrganizationUserDto,
      role: role || 'GUEST',
      user: {
        connect: {
          email: userEmail,
        },
      },
      organization: {
        connect: {
          documentCode: organizationCode,
        },
      },
    }
    await prisma.organizationUsers.create({ data })

    return `o usuário ${user?.name} agora faz parte da organização ${organization?.name}`
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
