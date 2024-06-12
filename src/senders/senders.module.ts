import { Module } from '@nestjs/common'
import { SendersService } from './senders.service'
import { SendersController } from './senders.controller'

@Module({
  providers: [SendersService],
  controllers: [SendersController],
})
export class SendersModule {}
