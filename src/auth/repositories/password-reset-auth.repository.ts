import { PrismaService } from 'src/prisma/prisma.service'
import { PasswordResetAuthDto } from '../dto/password-reset-auth.dto'
import { HttpException, NotFoundException } from '@nestjs/common'
import { hashSync } from 'bcrypt'
import { Prisma } from '@prisma/client'
import { NotificationsService } from 'src/notifications/notifications.service'

export const passwordResetAuthRepository = async (
  passwordResetAuthDto: PasswordResetAuthDto,
) => {
  const notification = new NotificationsService()
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 16)
  const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER!

  try {
    const { phone } = passwordResetAuthDto

    const user = await prisma.user.findFirst({
      where: { phone: phone },
    })
    if (!user)
      throw new NotFoundException(
        `a conta com o telefone ${phone} não foi encontrada no sistema`,
      )

    const data: Prisma.UserUpdateInput = {
      passHash: hashSync(randomCode, 10),
    }
    await prisma.user.update({ where: { phone: phone }, data })

    notification.sendSms({
      to: `+55${phone}`,
      from: TWILIO_PHONE_NUMBER,
      body: `${user?.name} sua senha de acesso a plataforma https://dedicado.digital foi redefinida para ${randomCode}`,
    })
    const message = `
        <p>${user?.name}, sua senha de acesso a plataforma https://dedicado.digital foi redefinida para ${randomCode}</p>
        </br>
        <p>É um prazer ter você por aqui!</p>
        `
    notification.sendEmail({
      to: `${user?.email}`,
      from: { name: 'dedicado', email: 'master@dedicado.digital' },
      subject: 'atualização de informações de acesso',
      text: message,
      html: message,
    })

    return JSON.stringify(
      `${user?.name}, a senha foi redefinida e enviada para o e-mail ${user?.email}`,
    )
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
