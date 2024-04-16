import { Inject, Injectable } from '@nestjs/common'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'
import { SpendSubscriptionDto } from './dto/spend-subscription.dto'
import {
  checkoutSubscription,
  createSubscription,
  spendSubscription,
} from './repositories/POST'
import {
  findSubscriptionById,
  findSubscriptionByOrganization,
  findSubscriptions,
} from './repositories/GET'
import { updateSubscription } from './repositories/PATCH'
import { removeSubscription } from './repositories/DELETE'
import { DeleteSubscriptionDto } from './dto/delete-subscription.dto'
import Stripe from 'stripe'
import { STRIPE_CLIENT } from 'src/stripe/stripe.constants'
import { CheckoutSubscriptionDto } from './dto/checkout-subscription.dto'

@Injectable()
export class SubscriptionsService {
  constructor(@Inject(STRIPE_CLIENT) private readonly stripe: Stripe) {}

  checkout(checkoutSubscriptionDto: CheckoutSubscriptionDto) {
    return checkoutSubscription(checkoutSubscriptionDto)
  }

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return createSubscription(createSubscriptionDto)
  }

  spend(spendSubscriptionDto: SpendSubscriptionDto) {
    return spendSubscription(spendSubscriptionDto)
  }

  findAll() {
    return findSubscriptions()
  }

  findOne(id: string) {
    return findSubscriptionById(id)
  }

  findByOrganization(document: string) {
    return findSubscriptionByOrganization(document)
  }

  update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    return updateSubscription(id, updateSubscriptionDto)
  }

  remove(id: string, deleteSubscriptionDto: DeleteSubscriptionDto) {
    return removeSubscription(id, deleteSubscriptionDto)
  }
}
