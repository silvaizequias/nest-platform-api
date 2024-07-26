import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function findByDocumentOrganizationRepository(document: string) {
  try {
    const organization = await prisma.organization.findFirst({
      where: { document: document },
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: {
        membership: {
          include: {
            user: {
              select: {
                id: true,
                role: true,
                image: true,
                name: true,
                phone: true,
              },
            },
          },
        },
        subscription: true,
      },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    return organization
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findManyOrganizationRepository() {
  try {
    return await prisma.organization.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: {
        membership: true,
        subscription: true,
      },
    })
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
      take: 100,
      include: {
        membership: true,
        subscription: true,
      },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    return organization
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
