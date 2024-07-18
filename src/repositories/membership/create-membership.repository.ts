import { HttpException, NotFoundException } from '@nestjs/common'
import { CreateMembershipValidator } from 'src/membership/membership.validator'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function createMembershipRepository(
  createMembershipValidator: CreateMembershipValidator,
) {
  const { organizationId, userId } = createMembershipValidator
  try {
    const organization = await prisma.organization.findFirst({
      where: { id: organizationId },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    const user = await prisma.user.findFirst({ where: { id: userId } })
    if (!user) throw new NotFoundException('O usuário não foi encontrado!')

    return createMembershipValidator
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
