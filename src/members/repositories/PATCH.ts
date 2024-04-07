import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateMemberDto } from '../dto/update-member.dto'

export const updateMember = async (
  id: string,
  updateMemberDto: UpdateMemberDto,
) => {
  const prisma = new PrismaService()

  try {
    delete updateMemberDto?.organizationDocument
    delete updateMemberDto?.userPhone

    const member = await prisma.member.findFirst({
      where: { id: id, softDeleted: false },
    })
    if (!member) throw new NotFoundException('o membro não foi encontrado')

    await prisma.member.update({
      where: { id: id },
      data: { ...updateMemberDto },
    })

    return JSON.stringify(`as informações foram atualizadas`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
