import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { SendersService } from './senders.service'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { SendEmailValidator, SendSMSValidator } from './senders.validator'

@ApiTags('senders')
@Controller('senders')
export class SendersController {
  constructor(private sendersService: SendersService) {}

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('email')
  email(@Body() sendEmailValidator: SendEmailValidator) {
    return this.sendersService.sendEmail(sendEmailValidator)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('sms')
  sms(@Body() sendSMSValidator: SendSMSValidator) {
    return this.sendersService.sendSMS(sendSMSValidator)
  }
}
