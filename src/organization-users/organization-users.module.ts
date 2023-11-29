import { Module } from '@nestjs/common'
import { OrganizationUsersService } from './organization-users.service'
import { OrganizationUsersController } from './organization-users.controller'

@Module({
  controllers: [OrganizationUsersController],
  providers: [OrganizationUsersService],
})
export class OrganizationUsersModule {}
