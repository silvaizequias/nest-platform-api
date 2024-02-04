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
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { ProfileAuthGuard } from 'src/auth/guards/profile-auth.guard'
import { Profiles } from 'src/users/decorators/user.decorator'
import { UserProfileEnum } from 'src/users/users.enumerator'

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Profiles(
    UserProfileEnum.master,
    UserProfileEnum.member,
    UserProfileEnum.consumer,
  )
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto)
  }

  @Profiles(UserProfileEnum.master)
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.subscriptionsService.findAll()
  }

  @Profiles(
    UserProfileEnum.master,
    UserProfileEnum.member,
    UserProfileEnum.consumer,
  )
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/code/:code')
  findByCode(@Param('code') code: string) {
    return this.subscriptionsService.findByCode(code)
  }

  @Profiles(
    UserProfileEnum.master,
    UserProfileEnum.member,
    UserProfileEnum.consumer,
  )
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(id)
  }

  @Profiles(
    UserProfileEnum.master,
    UserProfileEnum.member,
    UserProfileEnum.consumer,
  )
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
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

  @Profiles(UserProfileEnum.master)
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(id)
  }
}
