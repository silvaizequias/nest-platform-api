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
import { MembersService } from './members.service'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { DeleteMemberDto } from './dto/delete-member.dto'
import { AuthorizationGuard } from 'src/authorization/authorization.guard'
import { Profiles } from 'src/users/users.decorator'
import { UsersEnumerator } from 'src/users/users.enumerator'
import { UsersGuard } from 'src/users/users.guard'

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

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
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto)
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
    return this.membersService.findAll()
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
  @Get('phone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.membersService.findByPhone(phone)
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
    return this.membersService.findOne(id)
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
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(id, updateMemberDto)
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
  remove(@Param('id') id: string, @Body() deleteMemberDto: DeleteMemberDto) {
    return this.membersService.remove(id, deleteMemberDto)
  }
}
