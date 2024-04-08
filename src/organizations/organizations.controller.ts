import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
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
import { DeleteOrganizationDto } from './dto/delete-organization.dto'
import { AuthorizationGuard } from 'src/authorization/authorization.guard'
import { Profiles } from 'src/users/users.decorator'
import { UsersEnumerator } from 'src/users/users.enumerator'
import { UsersGuard } from 'src/users/users.guard'

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto)
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('phone/:phone')
  createFromMyPhone(
    @Param('phone') phone: string,
    @Body()
    createOrganizationDto: CreateOrganizationDto,
  ) {
    return this.organizationsService.createFromMyPhone(
      phone,
      createOrganizationDto,
    )
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.organizationsService.findAll()
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('document/:document')
  findByDocument(@Param('document') document: string) {
    return this.organizationsService.findByDocument(document)
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(id)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('verify/:document')
  verifyByDocument(@Param('document') document: string) {
    return this.organizationsService.verifyByDocument(document)
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationGuard, UsersGuard)
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

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
  )
  @UseGuards(AuthorizationGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body() deleteOrganizationDto: DeleteOrganizationDto,
  ) {
    return this.organizationsService.remove(id, deleteOrganizationDto)
  }
}
