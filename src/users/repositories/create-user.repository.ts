import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { hashSync } from 'bcrypt'
import { Prisma } from '@prisma/client'

export const createUserRepository = async (createUserDto: CreateUserDto) => {
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  try {
    const { name } = createUserDto

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      passHash: hashSync(randomCode, 10),
    }
    await prisma.user.create({ data })

    return `o usuario ${name} foi criado`
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
