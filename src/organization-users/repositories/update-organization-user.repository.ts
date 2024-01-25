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
    const { userPhone, organizationDocument } = updateOrganizationUserDto
    delete updateOrganizationUserDto?.userPhone
    delete updateOrganizationUserDto?.organizationDocument

    const user = await prisma.user.findFirst({
      where: { phone: userPhone },
    })
    if (!user) throw new NotFoundException('o usuario não foi encontrado')

    const organization = await prisma.organization.findFirst({
      where: { document: organizationDocument },
    })
    if (!organization)
      throw new NotFoundException('a organização não foi encontrada')

    const data: Prisma.OrganizationUsersUpdateInput = {
      ...updateOrganizationUserDto,
      user: {
        update: {
          phone: userPhone,
        },
      },
      organization: {
        update: {
          document: organizationDocument,
        },
      },
    }
    await prisma.organizationUsers.update({ where: { id: id }, data })

    return JSON.stringify(`as informações foram atualizadas`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
