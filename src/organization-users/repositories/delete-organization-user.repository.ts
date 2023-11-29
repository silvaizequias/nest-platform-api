import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const deleteOrganizationUserRepository = async (id: string) => {
  const prisma = new PrismaService()

  try {
    await prisma.organizationUsers.delete({
      where: { id: id },
    })

    return `o usuario foi removido da organização`
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
