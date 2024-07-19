import { Module } from '@nestjs/common'
import { OrganizationsService } from './organizations.service'
import { OrganizationsController } from './organizations.controller'
import { LocationService } from 'src/location/location.service'

@Module({
  imports: [],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, LocationService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
