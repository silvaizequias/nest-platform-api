import { HttpException, NotFoundException } from '@nestjs/common'
import { UpdateMembershipValidator } from 'src/memberships/membership.validator'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function updateMembershipRepository(
  id: string,
  updateMembershipValidator: UpdateMembershipValidator,
) {
  try {
    const membership = await prisma.membership.findFirst({
      where: { id: id },
      include: {
        organization: true,
        user: true,
      },
    })
    if (!membership) throw new NotFoundException('O membro não foi encontrado!')

    return await prisma.membership
      .update({
        where: { id: id },
        data: { ...updateMembershipValidator },
      })
      .then(() => {
        return JSON.stringify(
          `As informações do membro ${membership?.user?.name ?? ''} foram atualizadas!`,
        )
      })
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
