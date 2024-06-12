import { Module } from '@nestjs/common'
import { GenerativesService } from './generatives.service'

@Module({
  providers: [GenerativesService],
  exports: [GenerativesService],
})
export class GenerativesModule {}
