import { PrismaService } from 'src/prisma/prisma.service'
import { PasswordResetAuthDto } from '../dto/password-reset-auth.dto'
import { HttpException, NotFoundException } from '@nestjs/common'
import { hashSync } from 'bcrypt'
import { Prisma } from '@prisma/client'

export const passwordResetAuthRepository = async (
  passwordResetAuthDto: PasswordResetAuthDto,
) => {
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 16)

  try {
    const { email, phone } = passwordResetAuthDto

    const user = await prisma.user.findFirst({
      where: { email: email, phone: phone },
    })
    if (!user)
      throw new NotFoundException(
        `a conta com o e-mail ${email} e o telefone ${phone} não foi encontrada no sistema`,
      )

    const data: Prisma.UserUpdateInput = {
      passHash: hashSync(randomCode, 10),
    }
    await prisma.user.update({ where: { email: email }, data })

    return `${user?.name}, a senha foi redefinida e enviada para o e-mail ${user?.email}`
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
