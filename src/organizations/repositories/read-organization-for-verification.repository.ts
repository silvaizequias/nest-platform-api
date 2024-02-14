import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrganizationForVerificationRepository = async (
  document: string,
) => {
  const prisma = new PrismaService()

  try {
    const organziation = await prisma.organization.findFirst({
      where: { document: document, softDeleted: false },
      select: {
        active: true,
        document: true,
        name: true,
      },
    })
    if (!organziation) throw new NotFoundException('organização não encontrada')

    return organziation
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
