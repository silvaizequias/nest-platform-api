import { PrismaService } from 'src/prisma/prisma.service'
import { RegisterAuthDto } from '../dto/register-auth.dto'
import { ConflictException, HttpException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export const registerAuthRepository = async (
  registerAuthDto: RegisterAuthDto,
) => {
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 16)
  const defaultOrganization = '52378516000178' as string

  try {
    const { email, name, organizationDocument, password, phone } =
      registerAuthDto
    delete registerAuthDto?.password
    delete registerAuthDto.organizationDocument

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
          ...registerAuthDto,
          profile: 'consumer',
          passHash: hashSync(setPassword, 10),
        },
      },
    }
    await prisma.organizationUsers.create({ data })

    return JSON.stringify(`${name}, a sua conta foi criada na plataforma`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
