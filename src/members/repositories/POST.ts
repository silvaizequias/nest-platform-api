import {
  BadRequestException,
  ConflictException,
  HttpException,
  NotFoundException,
} from '@nestjs/common'
import { hashSync } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { CreateMemberDto } from '../dto/create-member.dto'
import {
  emailInviteMemberToOrganization,
  emailWelcomeToThePlatform,
  smsInviteMemberToOrganization,
  smsWelcomeToThePlatform,
} from 'src/utils/send-messages/templates'
import { sendEmail, sendSms } from 'src/utils/send-messages'

const prisma = new PrismaService()
const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

export const createMember = async (createMemberDto: CreateMemberDto) => {
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
      await prisma.user
        .create({
          data: {
            name: userPhone,
            email: userPhone + '@dedicado.digital',
            phone: userPhone,
            passHash: hashSync(randomCode, 10),
            zipCode: organization?.zipCode,
            street: organization?.street,
            latitude: organization?.latitude,
            longitude: organization?.longitude,
          },
        })
        .then(async () => {
          const emailMessage = emailWelcomeToThePlatform({
            name: userPhone ?? '',
            password: randomCode,
            phone: userPhone,
          })
          await sendEmail({
            body: emailMessage,
            subject: 'boas vindas a sua melhor plataforma de serviços',
            to: organization?.email,
          })
          const smsMessage = smsWelcomeToThePlatform({
            name: userPhone ?? '',
            password: randomCode,
          })
          await sendSms({ content: smsMessage, to: userPhone })
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

    await prisma.member
      .create({ data })
      .then(async () => {
        const emailMessage = emailInviteMemberToOrganization({
          member: user?.name || userPhone,
          organization: organization?.name,
          role: role,
        })
        await sendEmail({
          body: emailMessage,
          subject: `convite para participar da organização ${organization?.name.toLowerCase()}`,
          to: organization?.email,
        })
        const smsMessage = smsInviteMemberToOrganization({
          member: user?.name || userPhone,
          organization: organization?.name,
          role: role,
        })
        await sendSms({ content: smsMessage, to: user?.phone || userPhone })
      })
      .catch((error: any) => console.log(error))

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

export const importMembers = async (
  organizationDocument: string,
  importMemberDto: [],
) => {
  const memberPhones = importMemberDto.map((member: any) => member?.phone)

  try {
    const organization = await prisma.organization.findFirst({
      where: { document: organizationDocument },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    })
    if (!organization)
      throw new NotFoundException('a organização não foi encontrada')

    const organizationUsers = organization?.members
      ?.map((member) => {
        return member?.userId
      })
      .filter((userId) => userId)

    await prisma.user.createMany({
      data: importMemberDto,
      skipDuplicates: true,
    })

    const users = await prisma.user
      .findMany({
        where: { softDeleted: false },
        include: {
          organizations: true,
        },
      })
      .then((data) =>
        data
          .map((user) => {
            return organizationUsers.includes(user?.id)
              ? null
              : memberPhones.includes(user?.phone) && {
                  role: 'client',
                  userId: user?.id,
                  organizationId: organization?.id,
                }
          })
          .filter((userId) => userId),
      )

    if (!users[0])
      throw new BadRequestException(
        'todos os membros da lista já foram importados',
      )

    return users
      ?.map(async (data: any) => {
        return await prisma.member.createMany({
          data: data,
          skipDuplicates: true,
        })
      })
      .map((data) => {
        return !data[0] && users?.length > 1
          ? JSON.stringify(
              `${users?.length} membros foram adicionados na organização ${organization?.name}`,
            )
          : JSON.stringify(
              `${users?.length} membro foi adicionado na organização ${organization?.name}`,
            )
      })[0]
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
