import {
  ConflictException,
  HttpException,
  NotFoundException,
} from '@nestjs/common'
import { CreateMembershipValidator } from 'src/memberships/membership.validator'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function createMembershipRepository(
  createMembershipValidator: CreateMembershipValidator,
) {
  const { organizationDocument, role, userPhone } = createMembershipValidator
  try {
    const organization = await prisma.organization.findFirst({
      where: { document: organizationDocument },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    const user = await prisma.user.findFirst({ where: { phone: userPhone } })
    if (!user) {
      return await prisma.membership
        .create({
          data: {
            role: role,
            user: { create: { role: 'customer', phone: userPhone } },
            organization: {
              connect: {
                id: organization?.id,
              },
            },
          },
        })
        .then(() => {
          return JSON.stringify(
            `O usuário foi incluído na organização ${organization?.name ?? ''}!`,
          )
        })
    } else {
      const userId = user?.id
      const membership = await prisma.membership.findMany({
        where: { userId: userId },
      })
      if (membership) {
        membership.map((data) => {
          if (data?.organizationId == organization?.id)
            throw new ConflictException(
              `O usuário ${user?.name ?? ''} já faz parte da organização ${organization?.name}!`,
            )
        })
      }

      return await prisma.membership
        .create({
          data: {
            role: role,
            user: { connect: { id: user?.id } },
            organization: { connect: { id: organization?.id } },
          },
        })
        .then(() => {
          return JSON.stringify(
            `O usuário foi incluído na organização ${organization?.name ?? ''}!`,
          )
        })
    }
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
