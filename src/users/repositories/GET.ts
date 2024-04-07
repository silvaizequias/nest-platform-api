import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const findUsers = async () => {
  const prisma = new PrismaService()

  try {
    return await prisma.user.findMany({
      take: 100,
      //skip: 50,
      orderBy: { createdAt: 'desc' },
      where: { softDeleted: false },
      select: {
        id: true,
        active: true,
        available: true,
        profile: true,
        image: true,
        name: true,
        phone: true,
        email: true,
        zipCode: true,
        complement: true,
        latitude: true,
        longitude: true,
        organizations: {
          take: 50,
          include: {
            organization: true,
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

export const findUserByDocument = async (document: string) => {
  const prisma = new PrismaService()

  try {
    const user = await prisma.user.findFirst({
      where: { document: document, softDeleted: false },
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
        organizations: {
          take: 50,
          orderBy: { role: 'asc' },
          include: {
            organization: true,
          },
        },
      },
    })
    if (!user) throw new NotFoundException('usuário não encontrado')

    return user
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findUserByEmail = async (email: string) => {
  const prisma = new PrismaService()

  try {
    const user = await prisma.user.findFirst({
      where: { email: email, softDeleted: false },
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
        organizations: {
          take: 50,
          orderBy: { role: 'asc' },
          include: {
            organization: true,
          },
        },
      },
    })
    if (!user) throw new NotFoundException('usuário não encontrado')

    return user
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findUserById = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    const user = await prisma.user.findFirst({
      where: { id: id, softDeleted: false },
      include: {
        organizations: {
          take: 50,
          orderBy: { role: 'asc' },
          include: {
            organization: true,
          },
        },
      },
    })
    if (!user) throw new NotFoundException('usuário não encontrado')

    return user
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findUserByPhone = async (phone: string) => {
  const prisma = new PrismaService()

  try {
    const user = await prisma.user.findFirst({
      where: { phone: phone, softDeleted: false },
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
        organizations: {
          take: 50,
          orderBy: { role: 'asc' },
          include: {
            organization: true,
          },
        },
      },
    })
    if (!user) throw new NotFoundException('usuário não encontrado')

    return user
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
