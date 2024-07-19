import { HttpException, NotFoundException } from '@nestjs/common'
import { UpdateOrganizationValidator } from 'src/organizations/organization.validator'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function updateOrganizationRepository(
  id: string,
  updateOrganizationValidator: UpdateOrganizationValidator,
) {
  const {} = updateOrganizationValidator
  try {
    const organization = await prisma.organization.findFirst({
      where: { id: id },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    return await prisma.organization
      .update({
        where: { id: id },
        data: { ...updateOrganizationValidator },
      })
      .then((data) => {
        return JSON.stringify(
          `As informações da organização ${data?.name ?? ''} foram atualizadas!`,
        )
      })

    return id
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
