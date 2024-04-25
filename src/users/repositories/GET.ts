import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export const findUsers = async () => {
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
        street: true,
        complement: true,
        latitude: true,
        longitude: true,
        organizations: {
          take: 50,
          include: {
            organization: {
              include: {
                subscription: {
                  select: {
                    credit: true,
                    unlimited: true,
                  },
                },
              },
            },
          },
        },
        tasks: {
          take: 50,
          orderBy: { updatedAt: 'desc' },
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
        street: true,
        complement: true,
        latitude: true,
        longitude: true,
        organizations: {
          take: 50,
          orderBy: { role: 'asc' },
          include: {
            organization: {
              include: {
                subscription: {
                  select: {
                    credit: true,
                    unlimited: true,
                  },
                },
              },
            },
          },
        },
        tasks: {
          take: 50,
          orderBy: { updatedAt: 'desc' },
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
        street: true,
        complement: true,
        latitude: true,
        longitude: true,
        organizations: {
          take: 50,
          orderBy: { role: 'asc' },
          include: {
            organization: {
              include: {
                subscription: {
                  select: {
                    credit: true,
                    unlimited: true,
                  },
                },
              },
            },
          },
        },
        tasks: {
          take: 50,
          orderBy: { updatedAt: 'desc' },
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
  try {
    const user = await prisma.user.findFirst({
      where: { id: id, softDeleted: false },
      include: {
        organizations: {
          take: 50,
          orderBy: { role: 'asc' },
          include: {
            organization: {
              include: {
                subscription: {
                  select: {
                    credit: true,
                    unlimited: true,
                  },
                },
              },
            },
          },
        },
        tasks: {
          take: 50,
          orderBy: { updatedAt: 'desc' },
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
        street: true,
        complement: true,
        latitude: true,
        longitude: true,
        organizations: {
          take: 50,
          orderBy: { role: 'asc' },
          include: {
            organization: {
              include: {
                subscription: {
                  select: {
                    credit: true,
                    unlimited: true,
                  },
                },
              },
            },
          },
        },
        tasks: {
          take: 50,
          orderBy: { updatedAt: 'desc' },
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
