import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { OrganizationsService } from './organizations.service'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import {
  CreateOrganizationValidator,
  RemoveOrganizationValidator,
  UpdateOrganizationValidator,
} from './organization.validator'

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createOrganizationValidator: CreateOrganizationValidator) {
    return this.organizationsService.create(createOrganizationValidator)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('user/:id')
  createForUser(
    @Param('id') id: string,
    @Body()
    createOrganizationValidator: CreateOrganizationValidator,
  ) {
    return this.organizationsService.createForUser(
      id,
      createOrganizationValidator,
    )
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('document/:document')
  findByDocument(@Param('document') document: string) {
    return this.organizationsService.findByDocument(document)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findMany() {
    return this.organizationsService.findMany()
  }

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
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationValidator: UpdateOrganizationValidator,
  ) {
    return this.organizationsService.update(id, updateOrganizationValidator)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body() removeOrganizationValidator: RemoveOrganizationValidator,
  ) {
    return this.organizationsService.remove(id, removeOrganizationValidator)
  }
}
