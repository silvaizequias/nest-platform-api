import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateUserValidator } from 'src/users/user.validator'

const prisma = new PrismaService()

export async function updateUserRepository(
  id: string,
  updateUserValidator: UpdateUserValidator,
) {
  const {} = updateUserValidator
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
