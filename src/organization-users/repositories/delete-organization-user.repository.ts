import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const deleteOrganizationUserRepository = async (id: string) => {
  const prisma = new PrismaService()

  try {
    const organizationUser = await prisma.organizationUsers.findFirst({
      where: { id: id },
    })
    if (!organizationUser)
      throw new NotFoundException('nada foi encontrado por aqui')

    await prisma.organizationUsers.delete({
      where: { id: id },
    })
    return JSON.stringify(`o usuario foi removido da organização`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
