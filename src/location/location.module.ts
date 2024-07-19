import { Module } from '@nestjs/common'
import { LocationService } from './location.service'

@Module({
  imports: [],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
