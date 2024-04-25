import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export const findTasks = async () => {
  try {
    return await prisma.task.findMany({
      take: 100,
      //skip: 50,
      orderBy: { updatedAt: 'desc' },
      where: { softDeleted: false },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profile: true,
            phone: true,
            email: true,
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

export const findTaskByCode = async (code: string) => {
  try {
    return await prisma.task.findFirst({
      take: 100,
      //skip: 50,
      orderBy: { updatedAt: 'desc' },
      where: { code: code, softDeleted: false },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profile: true,
            phone: true,
            email: true,
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

export const findTaskById = async (id: string) => {
  try {
    return await prisma.task.findFirst({
      take: 100,
      //skip: 50,
      orderBy: { updatedAt: 'desc' },
      where: { id: id, softDeleted: false },
      include: {
        user: true,
      },
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
