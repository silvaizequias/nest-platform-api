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
import { MembershipsService } from './memberships.service'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import {
  CreateMembershipValidator,
  RemoveMembershipValidator,
  UpdateMembershipValidator,
} from './membership.validator'

@ApiTags('memberships')
@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createMembershipValidator: CreateMembershipValidator) {
    return this.membershipsService.create(createMembershipValidator)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('organization/:document')
  findByOrganization(@Param('document') document: string) {
    return this.membershipsService.findByOrganization(document)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user/:phone')
  findByUser(@Param('phone') phone: string) {
    return this.membershipsService.findByUser(phone)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findMany() {
    return this.membershipsService.findMany()
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membershipsService.findOne(id)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMembershipValidator: UpdateMembershipValidator,
  ) {
    return this.membershipsService.update(id, updateMembershipValidator)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body() removeMembershipValidator: RemoveMembershipValidator,
  ) {
    return this.membershipsService.remove(id, removeMembershipValidator)
  }
}
