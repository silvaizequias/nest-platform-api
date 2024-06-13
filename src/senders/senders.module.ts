import { Module } from '@nestjs/common'
import { SendersService } from './senders.service'
import { SendersController } from './senders.controller'
import { AWSService } from 'src/aws/aws.service'

@Module({
  providers: [SendersService, AWSService],
  controllers: [SendersController],
  exports: [SendersService],
})
export class SendersModule {}
