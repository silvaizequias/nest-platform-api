import {
  HttpException,
  Inject,
  Injectable,
  RawBodyRequest,
} from '@nestjs/common'
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
import { BadRequestError } from 'passport-headerapikey'

@Injectable()
export class SubscriptionsService {
  constructor(@Inject(STRIPE_CLIENT) private readonly stripe: Stripe) {}

  async webhook(request: RawBodyRequest<Request>, signature: string) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        request.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET ?? '',
      )

      const session = event.data.object as Stripe.Checkout.Session
      const metadata = session?.metadata

      if (!metadata)
        throw new BadRequestError('as informações de metadata são necessárias')

      switch (event.type) {
        case 'checkout.session.completed':
          await updateSubscription(metadata?.subscriptionId, {
            credit: Number(metadata?.credit),
            unlimited: false,
          }).then((data) => console.log(data))
          break

        case 'invoice.payment_succeeded':
          await updateSubscription(metadata?.subscriptionId, {
            credit: Number(metadata?.credit),
            unlimited: false,
          }).then((data) => console.log(data))
          break

        default:
          console.log(`unhandled event type ${event.type}`)
      }

      return JSON.stringify(null)
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  checkout(checkoutSubscriptionDto: CheckoutSubscriptionDto) {
    try {
      return checkoutSubscription(checkoutSubscriptionDto)
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  create(createSubscriptionDto: CreateSubscriptionDto) {
    try {
      return createSubscription(createSubscriptionDto)
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  spend(spendSubscriptionDto: SpendSubscriptionDto) {
    try {
      return spendSubscription(spendSubscriptionDto)
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  findAll() {
    try {
      return findSubscriptions()
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  findOne(id: string) {
    try {
      return findSubscriptionById(id)
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  findByOrganization(document: string) {
    try {
      return findSubscriptionByOrganization(document)
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    try {
      return updateSubscription(id, updateSubscriptionDto)
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  remove(id: string, deleteSubscriptionDto: DeleteSubscriptionDto) {
    try {
      return removeSubscription(id, deleteSubscriptionDto)
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }
}
