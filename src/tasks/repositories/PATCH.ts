import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateTaskDto } from '../dto/update-task.dto'
import { HttpException, NotFoundException } from '@nestjs/common'

const prisma = new PrismaService()

export const updateTask = async (id: string, updateTaskDto: UpdateTaskDto) => {
  try {
    const task = await prisma.task.findFirst({
      where: { id: id },
    })
    if (!task) throw new NotFoundException('tarefa não encontrada')

    await prisma.task.update({
      where: { id: id },
      data: { ...updateTaskDto },
    })

    return JSON.stringify(`a tarefa ${task?.code} foi atualizada`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
