import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function findManyUserRepository() {
  try {
    return await prisma.user.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: {
        membership: {
          include: {
            organization: true,
          },
        },
      },
    })
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findOneUserRepository(id: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { id: id },
      include: {
        membership: {
          orderBy: { createdAt: 'desc' },
          include: {
            organization: true,
          },
        },
      },
    })
    if (!user) throw new NotFoundException('O usuário não foi encontrado!')

    return user
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findOneUserByPhoneRepository(phone: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { phone: phone },
      include: {
        membership: {
          include: {
            organization: true,
          },
        },
      },
    })
    if (!user) throw new NotFoundException('O usuário não foi encontrado!')

    return user
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
