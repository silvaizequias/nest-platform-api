import { DynamicModule, Module, Provider } from '@nestjs/common'
import Stripe from 'stripe'
import { STRIPE_CLIENT } from './stripe.constants'
import { StripeController } from './stripe.controller'
import { StripeService } from './stripe.service'

@Module({})
export class StripeModule {
  static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
    const stripe = new Stripe(apiKey, config)

    const stripeProvider: Provider = {
      provide: STRIPE_CLIENT,
      useValue: stripe,
    }
    return {
      module: StripeModule,
      providers: [stripeProvider, StripeService],
      controllers: [StripeController],
      exports: [stripeProvider],
      global: true,
    }
  }
}
