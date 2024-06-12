import {
  HttpException,
  Inject,
  Injectable,
  RawBodyRequest,
} from '@nestjs/common'
import { STRIPE_CLIENT } from './stripe.constants'
import Stripe from 'stripe'
import { BadRequestError } from 'passport-headerapikey'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class StripeService {
  constructor(
    @Inject(STRIPE_CLIENT) private readonly stripe: Stripe,
    private readonly configService: ConfigService,
  ) {}

  async webhook(request: RawBodyRequest<Request>, signature: string) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        request.rawBody,
        signature,
        this.configService.getOrThrow('STRIPE_WEBHOOK_SECRET'),
      )

      const session = event.data.object as Stripe.Checkout.Session
      const metadata = session?.metadata

      if (!metadata)
        throw new BadRequestError('as informações de metadata são necessárias')

      switch (event.type) {
        case 'checkout.session.completed':
          break

        case 'invoice.payment_succeeded':
          break

        default:
          console.log(`unhandled event type ${event.type}`)
      }

      return JSON.stringify(null)
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }
}
