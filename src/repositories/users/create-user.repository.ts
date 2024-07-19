import { ConflictException, HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserValidator } from 'src/users/user.validator'

const prisma = new PrismaService()

export async function createUserRepository(
  createUserValidator: CreateUserValidator,
) {
  const { email, phone } = createUserValidator
  try {
    const userEmail = await prisma.user.findFirst({ where: { email: email } })
    if (userEmail)
      throw new ConflictException(
        `Não é possível criar um usuário com esse e-mail ${email}!`,
      )

    const userPhone = await prisma.user.findFirst({ where: { phone: phone } })
    if (userPhone)
      throw new ConflictException(
        `Não é possível criar um usuário com esse telefone ${phone}!`,
      )

    return await prisma.user
      .create({ data: createUserValidator })
      .then((data) => {
        return JSON.stringify(
          `${data?.name ?? 'O usuário'} agora faz parte da melhor plataforma de serviços!`,
        )
      })
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
