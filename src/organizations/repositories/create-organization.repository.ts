import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrganizationDto } from '../dto/create-organization.dto'

export const createOrganizationRepository = async (
  createOrganizationDto: CreateOrganizationDto,
) => {
  const prisma = new PrismaService()

  try {
    const { name } = createOrganizationDto

    await prisma.organization.create({ data: createOrganizationDto })

    return `a organização ${name} foi criada`
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
