import {
  ConflictException,
  HttpException,
  NotFoundException,
} from '@nestjs/common'
import { hashSync } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { CreateMemberDto } from '../dto/create-member.dto'

export const createMember = async (createMemberDto: CreateMemberDto) => {
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  try {
    const { userPhone, organizationDocument, role } = createMemberDto

    const organization = await prisma.organization.findFirst({
      where: { document: organizationDocument },
    })
    if (!organization)
      throw new NotFoundException('a organização não foi encontrada')

    const user = await prisma.user.findFirst({
      where: { phone: userPhone },
    })

    if (!user)
      await prisma.user.create({
        data: {
          name: userPhone,
          email: `${userPhone}@dedicado.digital`,
          phone: userPhone,
          passHash: hashSync(randomCode, 10),
          zipCode: organization?.zipCode,
          street: organization?.street,
          latitude: organization?.latitude,
          longitude: organization?.longitude,
        },
      })

    const member = await prisma.member.findMany({
      where: { userId: user?.id },
    })

    if (member) {
      member.map((member) => {
        if (member?.organizationId == organization?.id)
          throw new ConflictException(
            `o membro ${userPhone} já faz parte da organização ${organization?.name}`,
          )
      })
    }

    const data: Prisma.MemberCreateInput = {
      role: role,
      organization: {
        connect: {
          document: organizationDocument,
        },
      },
      user: {
        connect: {
          phone: userPhone,
        },
      },
    }

    await prisma.member.create({ data })

    return JSON.stringify(
      `${user?.name} agora faz parte da organização ${organization?.name} na plataforma`,
    )
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
