import { ConflictException, HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { hashSync } from 'bcrypt'
import { Prisma } from '@prisma/client'

export const createUserRepository = async (createUserDto: CreateUserDto) => {
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  try {
    const { name, email, phone, password } = createUserDto
    delete createUserDto.password

    const userPhone = await prisma.user.findFirst({
      where: { phone: phone },
    })
    if (userPhone)
      throw new ConflictException(
        `o email ${phone} já está vinculado a um usuário existente na plataforma`,
      )

    const userEmail = await prisma.user.findFirst({
      where: { email: email },
    })
    if (userEmail)
      throw new ConflictException(
        `o email ${email} já está vinculado a um usuário existente na plataforma`,
      )

    const setPassword = password || randomCode

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      passHash: hashSync(setPassword, 10),
    }
    await prisma.user.create({ data })

    return JSON.stringify(`o usuario ${name} foi criado`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
