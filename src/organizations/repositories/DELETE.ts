import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { DeleteOrganizationDto } from '../dto/delete-organization.dto'

const prisma = new PrismaService()

export const removeOrganization = async (
  id: string,
  deleteOrganizationDto: DeleteOrganizationDto,
) => {
  try {
    const { definitely } = deleteOrganizationDto

    const organization = await prisma.organization.findFirst({
      where: { id: id },
    })
    if (!organization) throw new NotFoundException('organização não encontrado')

    if (!definitely) {
      await prisma.organization.update({
        where: { id: id, softDeleted: false },
        data: {
          softDeleted: true,
        },
      })
      return JSON.stringify(
        `${organization?.name || ' a organização'} foi removida da plataforma`,
      )
    } else {
      await prisma.organization.delete({ where: { id: id } })
      return JSON.stringify(
        `${organization?.name || ' a organização'} foi removida definitivamente da plataforma`,
      )
    }
  } catch (error: any) {
    console.log(error)
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
