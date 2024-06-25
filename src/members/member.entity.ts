import { MemberRole } from './member.enum'

export class Member {
  id: string
  createdAt: Date
  updatedAt: Date
  role: MemberRole
  active: boolean
  userId: string
  companyId: string
}
