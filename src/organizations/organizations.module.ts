import { forwardRef, Module } from '@nestjs/common'
import { OrganizationsService } from './organizations.service'
import { OrganizationsController } from './organizations.controller'
import { LocationModule } from 'src/location/location.module'
import { LocationService } from 'src/location/location.service'

@Module({
  imports: [forwardRef(() => LocationModule)],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, LocationService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
