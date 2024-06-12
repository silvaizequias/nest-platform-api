import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  RawBodyRequest,
  Req,
  UseInterceptors,
  Headers,
} from '@nestjs/common'
import { StripeService } from './stripe.service'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('webhook')
  webhook(
    @Req() request: RawBodyRequest<Request>,
    @Headers('Stripe-Signature') signature: string,
  ) {
    return this.stripeService.webhook(request, signature)
  }
}
