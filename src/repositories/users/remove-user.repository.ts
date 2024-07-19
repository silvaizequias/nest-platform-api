import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RemoveUserValidator } from 'src/users/user.validator'

const prisma = new PrismaService()

export async function removeUserRepository(
  id: string,
  removeUserValidator: RemoveUserValidator,
) {
  const { definitely } = removeUserValidator
  try {
    const user = await prisma.user.findFirst({ where: { id: id } })
    if (!user) throw new NotFoundException('O usuário não foi encontrado!')

    if (definitely) {
      return await prisma.user.delete({ where: { id: id } }).then(() => {
        return JSON.stringify(
          `O usuário ${user?.name ?? ''} foi removido definitivamente da plataforma!`,
        )
      })
    } else {
      return await prisma.user
        .update({
          where: { id: id },
          data: {
            softDeleted: true,
            active: false,
          },
        })
        .then((data) => {
          return JSON.stringify(`O usuário ${data?.name ?? ''} foi removido!`)
        })
    }
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
