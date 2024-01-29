import { ConflictException, HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { hashSync } from 'bcrypt'
import { Prisma } from '@prisma/client'
import { NotificationsService } from 'src/notifications/notifications.service'

export const createUserRepository = async (createUserDto: CreateUserDto) => {
  const notification = new NotificationsService()
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()
  const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER!

  try {
    const { name, email, phone, profile, password } = createUserDto
    delete createUserDto.password

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

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      passHash: hashSync(setPassword, 10),
    }
    await prisma.user.create({ data })

    notification.sendSms({
      to: `+55${phone}`,
      from: TWILIO_PHONE_NUMBER,
      body: `${name} você foi registrado na plataforma dedicado como ${profile} e poderá acessar https://dedicado.digital com o seu número de celular e a senha ${setPassword}`,
    })
    const message = `
        <p>Olá ${name}, seja muito bem vindo(a) a dedicado, sua plataforma de serviços em núvem!</p>
        <p>Você foi registrado(a) na plataforma como ${profile} e agora poderá acessar https://dedicado.digital com o seu número de celular e a senha ${setPassword} todos os serviços disponíveis.</p>
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

    return JSON.stringify(`o usuario ${name} foi criado`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
