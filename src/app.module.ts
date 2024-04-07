import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthorizationModule } from './authorization/authorization.module'
import { MembersModule } from './members/members.module'
import { PrismaModule } from './prisma/prisma.module'
import { OrganizationsModule } from './organizations/organizations.module'
import { UsersModule } from './users/users.module'

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
