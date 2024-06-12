import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { SendersService } from './senders.service'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { SendEmailDto, SendSMSDto } from './senders.dto'

@ApiTags('senders')
@Controller('senders')
export class SendersController {
  constructor(private sendersService: SendersService) {}

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('email')
  email(@Body() sendEmailDto: SendEmailDto) {
    return this.sendersService.sendEmail(sendEmailDto)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('sms')
  sms(@Body() sendSMSDto: SendSMSDto) {
    return this.sendersService.sendSMS(sendSMSDto)
  }
}
