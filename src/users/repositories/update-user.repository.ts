import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateUserDto } from '../dto/update-user.dto'

export const updateUserRepository = async (
  id: string,
  updateUserDto: UpdateUserDto,
) => {
  const prisma = new PrismaService()

  try {
    const user = await prisma.user.findFirst({ where: { id: id } })
    if (!user) throw new NotFoundException('usuário não encontrado')

    await prisma.user.update({ where: { id: id }, data: updateUserDto })
    return JSON.stringify(`as informações do usuário foram atualizadas`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
