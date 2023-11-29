import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateOrganizationDto } from '../dto/update-organization.dto'

export const updateOrganizationRepository = async (
  id: string,
  updateOrganizationDto: UpdateOrganizationDto,
) => {
  const prisma = new PrismaService()

  try {
    await prisma.organization.update({
      where: { id: id },
      data: updateOrganizationDto,
    })

    return `as informações da organização foram atualizadas`
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
