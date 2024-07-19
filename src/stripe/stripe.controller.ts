import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  RawBodyRequest,
  Req,
  UseInterceptors,
  Headers,
  Body,
} from '@nestjs/common'
import { StripeService } from './stripe.service'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CheckoutValidator } from './stripe.validator'

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('checkout')
  create(@Body() checkoutValidator: CheckoutValidator) {
    return this.stripeService.checkout(checkoutValidator)
  }

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
