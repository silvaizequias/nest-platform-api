import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readUserByPhoneRepository = async (phone: string) => {
  const prisma = new PrismaService()

  try {
    return await prisma.user.findFirst({
      where: { phone: phone, softDeleted: false },
      select: {
        id: true,
        isActive: true,
        profile: true,
        image: true,
        name: true,
        email: true,
        organizations: {
          select: {
            id: true,
            isActive: true,
            role: true,
            organization: {
              select: {
                id: true,
                image: true,
                name: true,
                phone: true,
                email: true,
                documentCode: true,
                zipCode: true,
                complement: true,
                latitude: true,
                longitude: true,
              },
            },
          },
        },
      },
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
