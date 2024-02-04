import { Subscription } from '@prisma/client'

export class SubscriptionEntity implements Subscription {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  organizationId: string
  code: string
  customerId: string
  subscriptionId: string
  status: string
  recurrence: string
  currentPeriodEnd: Date
  spendLimit: number
  spending: number
  spendExceeded: boolean
  price: number
  priceId: string
}
