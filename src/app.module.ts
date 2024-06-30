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
import { PostsModule } from './posts/posts.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UploadsModule,
    AWSModule,
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    }),
    SendersModule,
    OrganizationsModule,
    MembersModule,
    UsersModule,
    PostsModule,
  ],
  providers: [],
})
export class AppModule {}
