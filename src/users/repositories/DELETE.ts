import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { DeleteUserDto } from '../dto/delete-user.dto'

const prisma = new PrismaService()

export const removeUser = async (id: string, deleteUserDto: DeleteUserDto) => {
  try {
    const { definitely } = deleteUserDto

    const user = await prisma.user.findFirst({
      where: { id: id },
    })
    if (!user) throw new NotFoundException('usuário não encontrado')

    if (!definitely) {
      await prisma.user.update({
        where: { id: id, softDeleted: false },
        data: {
          softDeleted: true,
        },
      })
      return JSON.stringify(`${user?.name ?? ''} foi removido da plataforma`)
    } else {
      await prisma.user.delete({ where: { id: id } })
      return JSON.stringify(
        `${user?.name ?? ''} foi removido definitivamente da plataforma`,
      )
    }
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
