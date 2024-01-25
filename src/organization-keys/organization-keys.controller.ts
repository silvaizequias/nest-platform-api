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

@ApiTags('organization-keys')
@Controller('organization-keys')
export class OrganizationKeysController {
  constructor(
    private readonly organizationKeysService: OrganizationKeysService,
  ) {}

  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createOrganizationKeyDto: CreateOrganizationKeyDto) {
    return this.organizationKeysService.create(createOrganizationKeyDto)
  }

  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.organizationKeysService.findAll()
  }

  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('authorization-key:authorizationKey')
  findByKey(@Param('key') authorizationKey: string) {
    return this.organizationKeysService.findByKey(authorizationKey)
  }

  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationKeysService.findOne(id)
  }

  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationKeysService.remove(id)
  }
}
