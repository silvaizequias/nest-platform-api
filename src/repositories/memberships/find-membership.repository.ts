import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const prisma = new PrismaService()

export async function findByUserMembershipRepository(userId: string) {
  try {
    const membership = await prisma.membership.findMany({
      where: { userId: userId },
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: {
        organization: true,
      },
    })
    if (!membership)
      throw new NotFoundException('O usuário não foi encontrado!')

    return membership
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findByOrganizationMembershipRepository(document: string) {
  try {
    const organization = await prisma.organization.findFirst({
      where: { document: document },
    })
    if (!organization)
      throw new NotFoundException('A organização não foi encontrada!')

    const memberships = await prisma.membership.findMany({
      where: { organizationId: organization?.id },
      include: {
        user: true,
      },
    })
    if (!memberships)
      throw new NotFoundException('A organização não foi encontrada!')

    return memberships
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findManyMembershipsRepository() {
  try {
    return await prisma.membership.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: {
        organization: true,
        user: true,
      },
    })
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export async function findOneMembershipRepository(id: string) {
  try {
    return await prisma.membership.findFirst({
      where: { id: id },
      include: { organization: true, user: true },
    })
  } catch (error) {
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
