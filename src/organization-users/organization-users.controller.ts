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
import { OrganizationUsersService } from './organization-users.service'
import { CreateOrganizationUserDto } from './dto/create-organization-user.dto'
import { UpdateOrganizationUserDto } from './dto/update-organization-user.dto'
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

@ApiTags('organization-users')
@Controller('organization-users')
export class OrganizationUsersController {
  constructor(
    private readonly organizationUsersService: OrganizationUsersService,
  ) {}

  @Profiles(
    UserProfileEnum.master,
    UserProfileEnum.member,
    UserProfileEnum.consumer,
    UserProfileEnum.guest,
  )
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createOrganizationUserDto: CreateOrganizationUserDto) {
    return this.organizationUsersService.create(createOrganizationUserDto)
  }

  @Profiles(
    UserProfileEnum.master,
    UserProfileEnum.member,
    UserProfileEnum.consumer,
    UserProfileEnum.guest,
  )
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.organizationUsersService.findAll()
  }

  @Profiles(
    UserProfileEnum.master,
    UserProfileEnum.member,
    UserProfileEnum.consumer,
    UserProfileEnum.guest,
  )
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/user/:id')
  findByUserId(@Param('id') id: string) {
    return this.organizationUsersService.findByUserId(id)
  }

  @Profiles(
    UserProfileEnum.master,
    UserProfileEnum.member,
    UserProfileEnum.consumer,
    UserProfileEnum.guest,
  )
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationUsersService.findOne(id)
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
    @Body() updateOrganizationUserDto: UpdateOrganizationUserDto,
  ) {
    return this.organizationUsersService.update(id, updateOrganizationUserDto)
  }

  @Profiles(UserProfileEnum.master)
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationUsersService.remove(id)
  }
}
