import { HttpException } from '@nestjs/common'
import { RemoveMembershipValidator } from 'src/membership/membership.validator'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function removeMembershipRepository(
  id: string,
  removeMembershipValidator: RemoveMembershipValidator,
) {
  const { definitely } = removeMembershipValidator
  try {
    return definitely
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
