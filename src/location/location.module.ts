import { forwardRef, Module } from '@nestjs/common'
import { LocationService } from './location.service'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [LocationService, UsersService],
  exports: [LocationService],
})
export class LocationModule {}
