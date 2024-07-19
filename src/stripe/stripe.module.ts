import { OrganizationsService } from 'src/organizations/organizations.service'
import { DynamicModule, forwardRef, Module, Provider } from '@nestjs/common'
import Stripe from 'stripe'
import { STRIPE_CLIENT } from './stripe.constants'
import { StripeController } from './stripe.controller'
import { StripeService } from './stripe.service'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'
import { OrganizationsModule } from 'src/organizations/organizations.module'
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module'
import { LocationModule } from 'src/location/location.module'
import { LocationService } from 'src/location/location.service'

@Module({})
export class StripeModule {
  static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
    const stripe = new Stripe(apiKey, config)

    const stripeProvider: Provider = {
      provide: STRIPE_CLIENT,
      useValue: stripe,
    }
    return {
      imports: [
        forwardRef(() => OrganizationsModule),
        forwardRef(() => SubscriptionsModule),
        forwardRef(() => LocationModule),
      ],
      module: StripeModule,
      providers: [
        stripeProvider,
        StripeService,
        SubscriptionsService,
        OrganizationsService,
        LocationService,
      ],
      controllers: [StripeController],
      exports: [stripeProvider],
      global: true,
    }
  }
}
