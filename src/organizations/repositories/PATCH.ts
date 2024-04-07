import { HttpException, NotFoundException } from '@nestjs/common'
import { UpdateOrganizationDto } from 'src/organizations/dto/update-organization.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { getAddressByZipCode } from 'utils/handle-address'
import { AddressByZipCodeType } from 'utils/handle-address/types'

const prisma = new PrismaService()

export const updateOrganization = async (
  id: string,
  updateOrganizationDto: UpdateOrganizationDto,
) => {
  try {
    const { zipCode } = updateOrganizationDto

    const organziation = await prisma.organization.findFirst({
      where: { id: id },
    })
    if (!organziation) throw new NotFoundException('organização não encontrado')

    if (zipCode) {
      const address: AddressByZipCodeType = await getAddressByZipCode(zipCode)

      await prisma.organization.update({
        where: { id: id },
        data: {
          ...updateOrganizationDto,
          street: address?.address || null,
          latitude: Number(address?.lat) || null,
          longitude: Number(address?.lng) || null,
        },
      })
      return JSON.stringify(
        `as informações da organização ${organziation?.name || ''} foram atualizadas`,
      )
    }

    await prisma.organization.update({
      where: { id: id },
      data: { ...updateOrganizationDto },
    })
    return JSON.stringify(
      `as informações da organização ${organziation?.name || ''} foram atualizadas`,
    )
  } catch (error: any) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
