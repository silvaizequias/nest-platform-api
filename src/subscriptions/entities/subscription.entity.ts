import { $Enums, Subscription } from '@prisma/client'

export class SubscriptionEntity implements Subscription {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  organizationId: string
  softDeleted: boolean
  active: boolean
  paymentGateway: $Enums.SubscriptionPaymentGateway
  paymentCustomerId: string
  paymentSubscriptionId: string
  paymentPriceId: string
  credit: number
  unlimited: boolean
}
