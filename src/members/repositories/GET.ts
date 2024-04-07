import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export const findMembers = async () => {
  try {
    return await prisma.member.findMany({
      take: 100,
      where: { softDeleted: false },
      include: {
        organization: {
          select: {
            id: true,
            active: true,
            name: true,
            image: true,
            document: true,
          },
        },
        user: {
          select: {
            id: true,
            active: true,
            available: true,
            name: true,
            image: true,
            zipCode: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findMemberById = async (id?: string) => {
  try {
    const member = await prisma.member.findFirst({
      where: { id: id, softDeleted: false },
      include: {
        organization: true,
        user: true,
      },
    })
    if (!member) throw new NotFoundException('o membro não foi encontrado')

    return member
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findMemberByPhone = async (phone?: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { phone: phone },
    })
    if (!user) throw new NotFoundException('o usuario não foi encontrado')

    const member = await prisma.member.findMany({
      take: 100,
      where: { userId: user?.id, softDeleted: false, active: true },
      include: {
        organization: true,
        user: {
          select: {
            id: true,
            active: true,
            available: true,
            name: true,
            image: true,
            zipCode: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    })
    if (!member) throw new NotFoundException('o membro não foi encontrado')

    return member
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
