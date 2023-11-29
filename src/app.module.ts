import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { OrganizationsModule } from './organizations/organizations.module'
import { OrganizationUsersModule } from './organization-users/organization-users.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    OrganizationsModule,
    OrganizationUsersModule,
    UsersModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
