import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateUserValidator } from 'src/users/user.validator'

const prisma = new PrismaService()

export async function updateUserRepository(
  id: string,
  updateUserValidator: UpdateUserValidator,
) {
  try {
    const user = await prisma.user.findFirst({ where: { id: id } })
    if (!user) throw new NotFoundException('O usuário não foi encontrado!')

    return await prisma.user
      .update({
        where: { id: id },
        data: { ...updateUserValidator },
      })
      .then((data) => {
        return JSON.stringify(
          `As informações do usuário ${data?.name ?? ''} foram atualizadas!`,
        )
      })
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
