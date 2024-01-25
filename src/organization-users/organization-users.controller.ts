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

@ApiTags('organization-users')
@Controller('organization-users')
export class OrganizationUsersController {
  constructor(
    private readonly organizationUsersService: OrganizationUsersService,
  ) {}

  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createOrganizationUserDto: CreateOrganizationUserDto) {
    return this.organizationUsersService.create(createOrganizationUserDto)
  }

  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.organizationUsersService.findAll()
  }

  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/user/:id')
  findByUserId(@Param('id') id: string) {
    return this.organizationUsersService.findByUserId(id)
  }

  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationUsersService.findOne(id)
  }

  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationUsersService.remove(id)
  }
}
