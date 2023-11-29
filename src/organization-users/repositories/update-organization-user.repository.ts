import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateOrganizationUserDto } from '../dto/update-organization-user.dto'
import { Prisma } from '@prisma/client'

export const updateOrganizationUserRepository = async (
  id: string,
  updateOrganizationUserDto: UpdateOrganizationUserDto,
) => {
  const prisma = new PrismaService()

  try {
    const { userEmail, organizationCode } = updateOrganizationUserDto
    delete updateOrganizationUserDto?.userEmail
    delete updateOrganizationUserDto?.organizationCode

    const user = await prisma.user.findFirst({
      where: { email: userEmail },
    })
    if (!user) throw new NotFoundException('o usuario não foi encontrado')

    const organization = await prisma.organization.findFirst({
      where: { documentCode: organizationCode },
    })
    if (!organization)
      throw new NotFoundException('a organização não foi encontrada')

    const data: Prisma.OrganizationUsersUpdateInput = {
      ...updateOrganizationUserDto,
      user: {
        update: {
          email: userEmail,
        },
      },
      organization: {
        update: {
          documentCode: organizationCode,
        },
      },
    }
    await prisma.organizationUsers.update({ where: { id: id }, data })

    return `as informações foram atualizadas`
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
