import { ConflictException, HttpException } from '@nestjs/common'
import { CreateOrganizationValidator } from 'src/organizations/organization.validator'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function createOrganizationRepository(
  createOrganizationValidator: CreateOrganizationValidator,
) {
  const { document } = createOrganizationValidator
  try {
    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (organization)
      throw new ConflictException(
        `Não é possível criar uma organização com esse documento ${document}!`,
      )

    return createOrganizationValidator
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
