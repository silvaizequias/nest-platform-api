import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UploadsModule } from './uploads/uploads.module'
import { AWSModule } from './aws/aws.module'
import { StripeModule } from './stripe/stripe.module'
import { SendersModule } from './senders/senders.module'
import { PrismaModule } from './prisma/prisma.module'
import { LocationModule } from './location/location.module'
import { UsersModule } from './users/users.module'
import { OrganizationsModule } from './organizations/organizations.module'
import { MembershipModule } from './membership/membership.module'
import { SubscriptionsModule } from './subscriptions/subscriptions.module'

@Module({
  imports: [
    AuthModule,
    AWSModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SendersModule,
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    }),
    UploadsModule,
    PrismaModule,
    LocationModule,
    UsersModule,
    OrganizationsModule,
    MembershipModule,
    SubscriptionsModule,
  ],
  providers: [],
})
export class AppModule {}
