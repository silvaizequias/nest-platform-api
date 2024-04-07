import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { DeleteMemberDto } from '../dto/delete-member.dto'

const prisma = new PrismaService()

export const removeMember = async (
  id: string,
  deleteMemberDto: DeleteMemberDto,
) => {
  try {
    const { definitely } = deleteMemberDto

    const member = await prisma.member.findFirst({
      where: { id: id },
    })
    if (!member) throw new NotFoundException('o membro não foi encontrado')

    if (!definitely) {
      await prisma.member.update({
        where: { id: id },
        data: {
          softDeleted: true,
        },
      })
      return JSON.stringify(`o membro foi removido da organização`)
    } else {
      await prisma.member.delete({
        where: { id: id },
      })
      return JSON.stringify(
        `o membro foi removido definitivamente da organização`,
      )
    }
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
