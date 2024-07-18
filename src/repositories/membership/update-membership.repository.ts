import { HttpException } from '@nestjs/common'
import { UpdateMembershipValidator } from 'src/membership/membership.validator'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function updateMembershipRepository(
  id: string,
  updateMembershipValidator: UpdateMembershipValidator,
) {
  const {} = updateMembershipValidator
  try {
    return id
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
