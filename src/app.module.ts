import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UploadsModule } from './uploads/uploads.module'
import { AWSModule } from './aws/aws.module'
import { StripeModule } from './stripe/stripe.module'
import { SendersModule } from './senders/senders.module'
import { OrganizationsModule } from './organizations/organizations.module'
import { MembersModule } from './members/members.module'
import { UsersModule } from './users/users.module'
import { ArticlesModule } from './articles/articles.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    ArticlesModule,
    AuthModule,
    AWSModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MembersModule,
    OrganizationsModule,
    SendersModule,
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    }),
    UploadsModule,
    UsersModule,
    PrismaModule,
  ],
  providers: [],
})
export class AppModule {}
