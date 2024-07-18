import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function findByDocumentOrganizationRepository(document: string) {
  try {
    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    return document
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findManyOrganizationRepository() {
  try {
    return []
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findOneOrganizationRepository(id: string) {
  try {
    const organization = await prisma.organization.findFirst({
      where: { id: id },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    return id
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
