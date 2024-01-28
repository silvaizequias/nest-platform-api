import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common'
import { OrganizationKeysService } from './organization-keys.service'
import { CreateOrganizationKeyDto } from './dto/create-organization-key.dto'
import { UpdateOrganizationKeyDto } from './dto/update-organization-key.dto'
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

@ApiTags('organization-keys')
@Controller('organization-keys')
export class OrganizationKeysController {
  constructor(
    private readonly organizationKeysService: OrganizationKeysService,
  ) {}

  @Profiles(UserProfileEnum.master, UserProfileEnum.member)
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createOrganizationKeyDto: CreateOrganizationKeyDto) {
    return this.organizationKeysService.create(createOrganizationKeyDto)
  }

  @Profiles(UserProfileEnum.master, UserProfileEnum.member)
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.organizationKeysService.findAll()
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
  @Get('authorization-key:authorizationKey')
  findByKey(@Param('key') authorizationKey: string) {
    return this.organizationKeysService.findByKey(authorizationKey)
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
    return this.organizationKeysService.findOne(id)
  }

  @Profiles(UserProfileEnum.master, UserProfileEnum.member)
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationKeyDto: UpdateOrganizationKeyDto,
  ) {
    return this.organizationKeysService.update(id, updateOrganizationKeyDto)
  }

  @Profiles(UserProfileEnum.master)
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationKeysService.remove(id)
  }
}
