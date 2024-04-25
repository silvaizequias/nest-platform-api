import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { DeleteTaskDto } from '../dto/delete-task.dto'

const prisma = new PrismaService()

export const removeTask = async (id: string, deleteTaskDto: DeleteTaskDto) => {
  try {
    const { definitely } = deleteTaskDto

    const task = await prisma.task.findFirst({
      where: { id: id },
    })
    if (!task) throw new NotFoundException('tarefa não encontrada')

    if (!definitely) {
      await prisma.task.update({
        where: { id: id, softDeleted: false },
        data: {
          softDeleted: true,
        },
      })
      return JSON.stringify(`${task?.code ?? ''} foi removida da plataforma`)
    } else {
      await prisma.user.delete({ where: { id: id } })
      return JSON.stringify(
        `${task?.code ?? ''} foi removida definitivamente da plataforma`,
      )
    }
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
