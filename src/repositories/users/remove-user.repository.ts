import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RemoveUserValidator } from 'src/users/user.validator'

const prisma = new PrismaService()

export async function removeUserRepository(
  id: string,
  removeUserValidator: RemoveUserValidator,
) {
  const { definitely } = removeUserValidator
  try {
    const user = await prisma.user.findFirst({ where: { id: id } })
    if (!user) throw new NotFoundException('O usuário não foi encontrado!')

    return definitely
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
