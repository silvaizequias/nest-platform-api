import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export const findOrganizations = async () => {
  try {
    return await prisma.organization.findMany({
      take: 100,
      where: { softDeleted: false },
      include: {
        members: {
          take: 100,
          orderBy: { role: 'asc' },
        },
        subscription: {
          select: {
            credit: true,
            unlimited: true,
          },
        },
      },
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findOrganizationByDocument = async (document: string) => {
  try {
    const organziation = await prisma.organization.findFirst({
      where: { document: document, softDeleted: false },
      include: {
        members: {
          take: 100,
          orderBy: { role: 'asc' },
          include: {
            user: {
              select: {
                id: true,
                active: true,
                available: true,
                profile: true,
                image: true,
                name: true,
                email: true,
                phone: true,
                zipCode: true,
                complement: true,
                latitude: true,
                longitude: true,
              },
            },
          },
        },
        subscription: true,
      },
    })
    if (!organziation) throw new NotFoundException('organização não encontrada')

    return organziation
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findOrganizationById = async (id?: string) => {
  try {
    const organziation = await prisma.organization.findFirst({
      where: { id: id, softDeleted: false },
      include: {
        members: {
          take: 100,
          orderBy: { role: 'asc' },
          include: {
            user: {
              select: {
                id: true,
                active: true,
                available: true,
                profile: true,
                image: true,
                name: true,
                email: true,
                phone: true,
                zipCode: true,
                complement: true,
                latitude: true,
                longitude: true,
              },
            },
          },
        },
        subscription: true,
      },
    })
    if (!organziation) throw new NotFoundException('organização não encontrado')

    return organziation
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const verifyOrganizationByDocument = async (document: string) => {
  try {
    const organziation = await prisma.organization.findFirst({
      where: { document: document, softDeleted: false },
      select: {
        active: true,
        document: true,
        name: true,
        subscription: {
          select: {
            credit: true,
            unlimited: true,
          },
        },
      },
    })
    if (!organziation) throw new NotFoundException('organização não encontrada')

    return organziation
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
