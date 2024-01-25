import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const deleteUserRepository = async (id: string) => {
  const prisma = new PrismaService()

  try {
    const user = await prisma.user.findFirst({
      where: { id: id },
    })
    if (!user) throw new NotFoundException('usuário não encontrado')

    await prisma.user.update({
      where: { id: id, softDeleted: false },
      data: {
        softDeleted: true,
      },
    })
    return JSON.stringify(`o usuário foi removido`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
