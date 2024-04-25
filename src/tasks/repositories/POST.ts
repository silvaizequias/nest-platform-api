import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTaskDto } from '../dto/create-task.dto'
import { Prisma } from '@prisma/client'

const prisma = new PrismaService()
const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

export const createTask = async (createTaskDto: CreateTaskDto) => {
  try {
    const { document } = createTaskDto
    delete createTaskDto?.document

    const user = await prisma.user.findFirst({
      where: { document: document },
    })
    if (!user) throw new NotFoundException('usuário não encontrado')

    const data: Prisma.TaskCreateInput = {
      ...createTaskDto,
      code: randomCode,
      user: {
        connect: {
          document: document,
        },
      },
    }

    return await prisma.task.create({ data }).then(() => {
      return JSON.stringify(`${randomCode} :: a tarefa foi criada`)
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
