import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const deleteOrganizationRepository = async (id: string) => {
  const prisma = new PrismaService()

  try {
    const organziation = await prisma.organization.findFirst({
      where: { id: id },
    })
    if (!organziation) throw new NotFoundException('organização não encontrado')

    await prisma.organization.update({
      where: { id: id, softDeleted: false },
      data: {
        softDeleted: true,
      },
    })
    return JSON.stringify(`a organização foi removida`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
