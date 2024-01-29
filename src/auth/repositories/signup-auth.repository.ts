import { PrismaService } from 'src/prisma/prisma.service'
import { SignUpAuthDto } from '../dto/signup-auth.dto'
import { ConflictException, HttpException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { NotificationsService } from 'src/notifications/notifications.service'

export const signUpAuthRepository = async (signUpAuthDto: SignUpAuthDto) => {
  const notification = new NotificationsService()
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 16)
  const defaultOrganization = '52378516000178' as string
  const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER!

  try {
    const { email, name, organizationDocument, password, phone } = signUpAuthDto
    delete signUpAuthDto?.password
    delete signUpAuthDto.organizationDocument

    const userPhone = await prisma.user.findFirst({
      where: { phone: phone },
    })
    if (userPhone)
      throw new ConflictException(
        `o email ${phone} já está vinculado a um usuário existente na plataforma`,
      )

    const userEmail = await prisma.user.findFirst({
      where: { email: email },
    })
    if (userEmail)
      throw new ConflictException(
        `o email ${email} já está vinculado a um usuário existente na plataforma`,
      )

    const setPassword = password || randomCode

    const data: Prisma.OrganizationUsersCreateInput = {
      role: 'client',
      active: true,
      organization: {
        connect: {
          document: organizationDocument || defaultOrganization,
        },
      },
      user: {
        create: {
          ...signUpAuthDto,
          profile: 'consumer',
          passHash: hashSync(setPassword, 10),
        },
      },
    }
    await prisma.organizationUsers.create({ data })

    notification.sendSms({
      to: `+55${phone}`,
      from: TWILIO_PHONE_NUMBER,
      body: `${name} você se registrou na plataforma dedicado como cliente e poderá acessar https://dedicado.digital com o seu número de celular e a senha ${setPassword}`,
    })
    const message = `
        <p>Olá ${name}, seja muito bem vindo(a) a dedicado, sua plataforma de serviços em núvem!</p>
        <p>Você se registrou na plataforma como cliente e agora poderá acessar https://dedicado.digital com o seu número de celular e a senha ${setPassword} todos os serviços disponíveis.</p>
        </br>
        <p>É um prazer ter você por aqui!</p>
        `
    notification.sendEmail({
      to: `${email}`,
      from: { name: 'dedicado', email: 'master@dedicado.digital' },
      subject: 'boas vindas a melhor plataforma de serviços',
      text: message,
      html: message,
    })

    return JSON.stringify(`${name}, a sua conta foi criada na plataforma`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
