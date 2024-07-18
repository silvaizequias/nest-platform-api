import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function findManyUserRepository() {
  try {
    return []
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findOneUserRepository(id: string) {
  try {
    const user = await prisma.user.findFirst({ where: { id: id } })
    if (!user) throw new NotFoundException('O usuário não foi encontrado!')

    return id
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
