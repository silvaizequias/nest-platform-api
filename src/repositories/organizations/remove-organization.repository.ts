import { HttpException, NotFoundException } from '@nestjs/common'
import { RemoveOrganizationValidator } from 'src/organizations/organization.validator'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function removeOrganizationRepository(
  id: string,
  removeOrganizationValidator: RemoveOrganizationValidator,
) {
  const { definitely } = removeOrganizationValidator
  try {
    const organization = await prisma.organization.findFirst({
      where: { id: id },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    if (definitely) {
      return await prisma.organization
        .delete({ where: { id: id } })
        .then(() => {
          return JSON.stringify(
            `A organização ${organization?.name ?? ''} foi removida definitivamente da plataforma!`,
          )
        })
    } else {
      return await prisma.organization
        .update({
          where: { id: id },
          data: {
            softDeleted: true,
            active: false,
          },
        })
        .then((data) => {
          return JSON.stringify(
            `A organização ${data?.name ?? ''} foi removida!`,
          )
        })
    }
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
