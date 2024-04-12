import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { SubscriptionsService } from './subscriptions.service'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'
import { DeleteSubscriptionDto } from './dto/delete-subscription.dto'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthorizationJWTGuard } from 'src/authorization/authorization.guard'
import { Profiles } from 'src/users/users.decorator'
import { UsersEnumerator } from 'src/users/users.enumerator'
import { UsersGuard } from 'src/users/users.guard'
import { SpendSubscriptionDto } from './dto/spend-subscription.dto'

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto)
  }

  //@Profiles(
  //  UsersEnumerator.master,
  //  UsersEnumerator.member,
  //  UsersEnumerator.consumer,
  //  UsersEnumerator.guest,
  //)
  //@UseGuards(AuthorizationJWTGuard, UsersGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('spend')
  spend(@Body() spendSubscriptionDto: SpendSubscriptionDto) {
    return this.subscriptionsService.spend(spendSubscriptionDto)
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.subscriptionsService.findAll()
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(id)
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('organization:document')
  findByOrganization(@Param('document') document: string) {
    return this.subscriptionsService.findByOrganization(document)
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionsService.update(id, updateSubscriptionDto)
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body() deleteSubscriptionDto: DeleteSubscriptionDto,
  ) {
    return this.subscriptionsService.remove(id, deleteSubscriptionDto)
  }
}
