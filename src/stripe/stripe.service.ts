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
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'
import { OrganizationsService } from 'src/organizations/organizations.service'
import { CheckoutValidator } from './stripe.validator'

@Injectable()
export class StripeService {
  constructor(
    @Inject(STRIPE_CLIENT) private readonly stripe: Stripe,
    private readonly configService: ConfigService,
    private readonly organizationsService: OrganizationsService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  private readonly platformUrl = this.configService.getOrThrow('PLATFORM_URL')

  async checkout(checkoutValidator: CheckoutValidator) {
    const { credit, document } = checkoutValidator
    try {
      const { name, subscription } =
        await this.organizationsService.findByDocument(document)
      const { id, paymentCustomerId } = subscription

      return await this.stripe.checkout.sessions.create({
        customer: paymentCustomerId,
        phone_number_collection: { enabled: true },
        mode: 'payment',
        currency: 'brl',
        payment_method_types: ['card'],
        line_items: [
          {
            quantity: credit,
            price_data: {
              currency: 'BRL',
              unit_amount: 1.2 * 100,
              product_data: {
                name: 'Plataforma Dedicado',
                description: `Créditos para a organização  ${name}`,
              },
            },
          },
        ],
        success_url: `${this.platformUrl}/${document}`,
        cancel_url: `${this.platformUrl}/${document}`,
        metadata: {
          credit,
          id,
        },
      })
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  async createCustomer(organizationDocument: string) {
    const codeGenerator = Math.random().toString(32).substr(2, 8).toUpperCase()
    try {
      const {
        city,
        complement,
        email,
        id,
        name,
        phone,
        state,
        street,
        zipCode,
      } = await this.organizationsService.findByDocument(organizationDocument)

      return await this.stripe.customers
        .create({
          name: name,
          email: email,
          phone: phone,
          address: {
            postal_code: zipCode,
            line1: street,
            line2: complement,
            city: city,
            state: state,
          },
          metadata: {
            organizationDocument,
          },
        })
        .then(
          async (data) =>
            await this.subscriptionsService.create({
              active: true,
              code: codeGenerator,
              credit: 100,
              organizationId: id,
              paymentCustomerId: data?.id,
              paymentGateway: 'stripe',
              paymentPriceId: null,
              paymentSubscriptionId: null,
              unlimited: false,
            }),
        )
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  async webhook(request: RawBodyRequest<Request>, signature: string) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        request.rawBody,
        signature,
        this.configService.getOrThrow('STRIPE_WEBHOOK_SECRET'),
      )

      const session = event.data.object as Stripe.Checkout.Session
      const metadata = session?.metadata
      const { credit, subscriptionId } = metadata

      if (!metadata)
        throw new BadRequestError('as informações de metadata são necessárias')

      switch (event.type) {
        case 'checkout.session.completed':
          this.subscriptionsService
            .update(subscriptionId, {
              credit: Number(credit),
              unlimited: false,
            })
            .then((data) => console.log(data))
          break

        case 'invoice.payment_succeeded':
          this.subscriptionsService
            .update(subscriptionId, {
              credit: Number(credit),
              unlimited: false,
            })
            .then((data) => console.log(data))
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
