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
import { OrganizationsService } from './organizations.service'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
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

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

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
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto)
  }

  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/for-me/:userPhone')
  createForMe(
    @Param('userPhone') userPhone: string,
    @Body() createOrganizationDto: CreateOrganizationDto,
  ) {
    return this.organizationsService.createForMe(
      userPhone,
      createOrganizationDto,
    )
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
  @Get()
  findAll() {
    return this.organizationsService.findAll()
  }

  //@Profiles(
  //  UserProfileEnum.master,
  //  UserProfileEnum.member,
  //  UserProfileEnum.consumer,
  //  UserProfileEnum.guest,
  //)
  //@UseGuards(JwtAuthGuard, ProfileAuthGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/document/:document')
  findByDocument(@Param('document') document: string) {
    return this.organizationsService.findByDocument(document)
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
    return this.organizationsService.findOne(id)
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
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(id, updateOrganizationDto)
  }

  @Profiles(UserProfileEnum.master)
  @UseGuards(JwtAuthGuard, ProfileAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(id)
  }
}
