import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const deleteUserRepository = async (id: string) => {
  const prisma = new PrismaService()

  try {
    await prisma.user.update({
      where: { id: id, softDeleted: false },
      data: {
        softDeleted: true,
      },
    })

    return `o usuário foi removido`
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
