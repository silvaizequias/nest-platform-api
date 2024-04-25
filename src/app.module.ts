import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthorizationModule } from './authorization/authorization.module'
import { MembersModule } from './members/members.module'
import { PrismaModule } from './prisma/prisma.module'
import { OrganizationsModule } from './organizations/organizations.module'
import { UsersModule } from './users/users.module'
import { SubscriptionsModule } from './subscriptions/subscriptions.module'
import { StripeModule } from './stripe/stripe.module'
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthorizationModule,
    MembersModule,
    OrganizationsModule,
    PrismaModule,
    UsersModule,
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    }),
    SubscriptionsModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
