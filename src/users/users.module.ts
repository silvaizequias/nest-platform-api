import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { LocationModule } from 'src/location/location.module'
import { LocationService } from 'src/location/location.service'

@Module({
  imports: [forwardRef(() => LocationModule)],
  controllers: [UsersController],
  providers: [UsersService, LocationService],
  exports: [UsersService],
})
export class UsersModule {}
