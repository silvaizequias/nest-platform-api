import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common'
import { SubscriptionsService } from './subscriptions.service'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import {
  RemoveSubscriptionValidator,
  UpdateSubscriptionValidator,
} from './subscription.validator'

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('code/:code')
  findByCode(@Param('code') code: string) {
    return this.subscriptionsService.findByCode(code)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('organization/:document')
  findByOrganization(@Param('document') document: string) {
    return this.subscriptionsService.findByOrganization(document)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findMany() {
    return this.subscriptionsService.findMany()
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(id)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionValidator: UpdateSubscriptionValidator,
  ) {
    return this.subscriptionsService.update(id, updateSubscriptionValidator)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body() removeSubscriptionValidator: RemoveSubscriptionValidator,
  ) {
    return this.subscriptionsService.remove(id, removeSubscriptionValidator)
  }
}
