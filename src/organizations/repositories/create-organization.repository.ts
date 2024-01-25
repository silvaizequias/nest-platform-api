import { ConflictException, HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrganizationDto } from '../dto/create-organization.dto'
import { Prisma } from '@prisma/client'

export const createOrganizationRepository = async (
  createOrganizationDto: CreateOrganizationDto,
) => {
  const prisma = new PrismaService()

  try {
    const { name, document } = createOrganizationDto
    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (organization)
      throw new ConflictException(
        `a organização ${name} já existe na plataforma`,
      )

    const data: Prisma.OrganizationCreateInput = {
      ...createOrganizationDto,
    }
    await prisma.organization.create({ data })

    return JSON.stringify(`a organização ${name} foi criada no sistema`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
