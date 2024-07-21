import { HttpException, NotFoundException } from '@nestjs/common'
import { RemoveMembershipValidator } from 'src/memberships/membership.validator'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function removeMembershipRepository(
  id: string,
  removeMembershipValidator: RemoveMembershipValidator,
) {
  const { definitely } = removeMembershipValidator
  try {
    const membership = await prisma.membership.findFirst({
      where: { id: id },
      include: {
        organization: true,
        user: true,
      },
    })
    if (!membership) throw new NotFoundException('O membro não foi encontrado!')

    if (definitely) {
      return await prisma.membership.delete({ where: { id: id } }).then(() => {
        return JSON.stringify(
          `O membro ${membership?.user?.name ?? ''} foi removido definitivamente da organização!`,
        )
      })
    } else {
      return await prisma.membership
        .update({
          where: { id: id },
          data: { softDeleted: true, active: false },
        })
        .then(() => {
          return JSON.stringify(
            `O membro ${membership?.user?.name ?? ''} foi removido!`,
          )
        })
    }
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
