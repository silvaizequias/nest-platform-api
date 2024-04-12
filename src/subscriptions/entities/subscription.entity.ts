import { Subscription } from '@prisma/client'

export class SubscriptionEntity implements Subscription {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  organizationId: string
  softDeleted: boolean
  active: boolean
  stripeCustomerId: string
  stripeSubscriptionId: string
  stripePriceId: string
  credit: number
  unlimited: boolean
}
