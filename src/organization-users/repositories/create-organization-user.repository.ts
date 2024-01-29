import {
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrganizationUserDto } from '../dto/create-organization-user.dto'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { NotificationsService } from 'src/notifications/notifications.service'

export const createOrganizationUserRepository = async (
  createOrganizationUserDto: CreateOrganizationUserDto,
) => {
  const notification = new NotificationsService()
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 14)
  const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER!

  try {
    const { userPhone, organizationDocument, role } = createOrganizationUserDto
    delete createOrganizationUserDto?.userPhone
    delete createOrganizationUserDto?.organizationDocument

    const organization = await prisma.organization.findFirst({
      where: { document: organizationDocument },
    })
    if (!organization)
      throw new NotFoundException('a organização não foi encontrada')

    const user = await prisma.user.findFirst({
      where: { phone: userPhone },
    })
    if (!user) {
      const data: Prisma.OrganizationUsersCreateInput = {
        ...createOrganizationUserDto,
        organization: {
          connect: {
            document: organizationDocument,
          },
        },
        user: {
          create: {
            profile: 'member',
            name: 'Usuário da ' + organization?.name?.split(' ')[0],
            phone: userPhone,
            email: userPhone + '@dedicado.digital',
            passHash: hashSync(randomCode, 10),
          },
        },
      }
      await prisma.organizationUsers.create({ data })
      notification.sendSms({
        to: `+55${userPhone}`,
        from: TWILIO_PHONE_NUMBER,
        body: `você foi registrado na plataforma dedicado como membro e poderá acessar https://dedicado.digital com o seu número de celular e a senha ${randomCode}`,
      })
      return JSON.stringify(
        `o usuario foi criado e incluído na organização ${organization?.name} como ${role}`,
      )
    }

    const organizationUser = await prisma.organizationUsers.findFirst({
      where: { userId: user?.id },
    })
    if (organizationUser && organizationUser.organizationId == organization.id)
      throw new ForbiddenException(
        `${user?.name} já está como ${organizationUser?.role} na organização ${organization?.name}`,
      )

    const data: Prisma.OrganizationUsersCreateInput = {
      ...createOrganizationUserDto,
      role: role || 'client',
      user: {
        connect: {
          phone: userPhone,
        },
      },
      organization: {
        connect: {
          document: organizationDocument,
        },
      },
    }
    await prisma.organizationUsers.create({ data })

    notification.sendSms({
      to: `+55${userPhone}`,
      from: TWILIO_PHONE_NUMBER,
      body: `${user?.name} você foi adicionado na plataforma dedicado como ${role} da organização ${organization?.name}`,
    })
    const message = `
        <p>Olá ${user?.name}, seja muito bem vindo(a) a dedicado, sua plataforma de serviços em núvem!</p>
        <p>Você foi adicionado na plataforma dedicado como ${role} da organização ${organization?.name}</p>
        </br>
        <p>É um prazer ter você por aqui!</p>
        `
    if (user?.email) {
      notification.sendEmail({
        to: `${user?.email}`,
        from: { name: 'dedicado', email: 'master@dedicado.digital' },
        subject: 'você agora faz parte da organizacão ${organization?.name}',
        text: message,
        html: message,
      })
    }

    return JSON.stringify(
      `o usuário ${user?.name} agora faz parte da organização ${organization?.name}`,
    )
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
