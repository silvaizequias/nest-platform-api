import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const deleteOrganizationRepository = async (id: string) => {
  const prisma = new PrismaService()

  try {
    await prisma.organization.update({
      where: { id: id, softDeleted: false },
      data: {
        softDeleted: true,
      },
    })

    return `a organização foi removida`
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
