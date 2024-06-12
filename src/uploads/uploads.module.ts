import { Module } from '@nestjs/common'
import { UploadsService } from './uploads.service'
import { UploadsController } from './uploads.controller'
import { AWSService } from 'src/aws/aws.service'

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, AWSService],
})
export class UploadsModule {}
