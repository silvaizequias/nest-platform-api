import { forwardRef, Module } from '@nestjs/common'
import { OrganizationsService } from './organizations.service'
import { OrganizationsController } from './organizations.controller'
import { StripeModule } from 'src/stripe/stripe.module'
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'
import { StripeService } from 'src/stripe/stripe.service'
import { LocationModule } from 'src/location/location.module'
import { LocationService } from 'src/location/location.service'

@Module({
  imports: [
    forwardRef(() => StripeModule),
    forwardRef(() => SubscriptionsModule),
    forwardRef(() => LocationModule),
  ],
  controllers: [OrganizationsController],
  providers: [
    OrganizationsService,
    SubscriptionsService,
    StripeService,
    LocationService,
  ],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
