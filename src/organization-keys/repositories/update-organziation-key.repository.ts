import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateOrganizationKeyDto } from '../dto/update-organization-key.dto'
import { Prisma } from '@prisma/client'

export const updateOrganizationKeyRepository = async (
  id: string,
  updateOrganizationKeyDto: UpdateOrganizationKeyDto,
) => {
  const prisma = new PrismaService()

  try {
    delete updateOrganizationKeyDto.organizationDocument

    const organizationKey = await prisma.organizationKeys.findFirst({
      where: { id: id },
    })
    if (!organizationKey)
      throw new NotFoundException('nada encontrado por aqui')

    const data: Prisma.OrganizationKeysUpdateInput = {
      ...updateOrganizationKeyDto,
    }
    await prisma.organizationKeys.update({ where: { id: id }, data })

    return JSON.stringify(`as informações foram atualizadas`)
  } catch (error: any) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
