import { forwardRef, Module } from '@nestjs/common'
import { SubscriptionsService } from './subscriptions.service'
import { SubscriptionsController } from './subscriptions.controller'
import { StripeService } from 'src/stripe/stripe.service'
import { StripeModule } from 'src/stripe/stripe.module'
import { OrganizationsModule } from 'src/organizations/organizations.module'
import { OrganizationsService } from 'src/organizations/organizations.service'
import { LocationModule } from 'src/location/location.module'
import { LocationService } from 'src/location/location.service'

@Module({
  imports: [
    forwardRef(() => StripeModule),
    forwardRef(() => OrganizationsModule),
    forwardRef(() => LocationModule),
  ],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsService,
    StripeService,
    OrganizationsService,
    LocationService,
  ],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
