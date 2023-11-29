import { PrismaService } from 'src/prisma/prisma.service'
import { SignUpAuthDto } from '../dto/signup-auth.dto'
import { ConflictException, HttpException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export const signUpAuthRepository = async (signUpAuthDto: SignUpAuthDto) => {
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 16)

  try {
    const { email, name, password, phone } = signUpAuthDto
    delete signUpAuthDto?.password

    const userEmail = await prisma.user.findFirst({
      where: { email: email },
    })

    const userPhone = await prisma.user.findFirst({
      where: { phone: phone },
    })

    if (userEmail || userPhone)
      throw new ConflictException(
        `o e-mail ${email} ou o telefone ${phone} já estão em uso`,
      )

    const data: Prisma.UserCreateInput = {
      ...signUpAuthDto,
      profile: 'USER',
      passHash: hashSync(password || randomCode, 10),
    }
    await prisma.user.create({ data })

    return `${name}, a sua conta foi criada no sistema`
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
