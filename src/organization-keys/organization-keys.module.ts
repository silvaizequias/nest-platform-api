import { Module } from '@nestjs/common'
import { OrganizationKeysService } from './organization-keys.service'
import { OrganizationKeysController } from './organization-keys.controller'

@Module({
  controllers: [OrganizationKeysController],
  providers: [OrganizationKeysService],
})
export class OrganizationKeysModule {}
