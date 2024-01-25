import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const deleteOrganizationKeyRepository = async (id: string) => {
  const prisma = new PrismaService()

  try {
    const organizationKey = await prisma.organizationKeys.findFirst({
      where: { id: id },
    })
    if (!organizationKey)
      throw new NotFoundException('chave de autorização não encontrada')

    await prisma.organizationKeys.delete({
      where: { id: id },
    })
    return JSON.stringify(`a chave de autorizaçao da organização foi removida`)
  } catch (error: any) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
