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
  //UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import {
  //ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { LoginUserDto } from './dto/login-user.dto'
import { DeleteUserDto } from './dto/delete-user.dto'
//import { Profiles } from './users.decorator'
//import { UsersEnumerator } from './users.enumerator'
//import { AuthorizationGuard } from 'src/authorization/authorization.guard'
//import { UsersGuard } from './users.guard'
//import { AuthGuard } from '@nestjs/passport'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto)
  }

  //@Profiles(
  //  UsersEnumerator.master,
  //  UsersEnumerator.member,
  //  UsersEnumerator.consumer,
  //  UsersEnumerator.guest,
  //)
  //@UseGuards(AuthGuard('authorizationKey'), AuthorizationGuard, UsersGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  //@Profiles(
  //  UsersEnumerator.master,
  //  UsersEnumerator.member,
  //  UsersEnumerator.consumer,
  //  UsersEnumerator.guest,
  //)
  //@UseGuards(AuthGuard('authorizationKey'), AuthorizationGuard, UsersGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('document/:document')
  findByDocument(@Param('document') document: string) {
    return this.usersService.findByDocument(document)
  }

  //@Profiles(
  //  UsersEnumerator.master,
  //  UsersEnumerator.member,
  //  UsersEnumerator.consumer,
  //  UsersEnumerator.guest,
  //)
  //@UseGuards(AuthGuard('authorizationKey'), AuthorizationGuard, UsersGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email)
  }

  //@Profiles(
  //  UsersEnumerator.master,
  //  UsersEnumerator.member,
  //  UsersEnumerator.consumer,
  //  UsersEnumerator.guest,
  //)
  //@UseGuards(AuthGuard('authorizationKey'), AuthorizationGuard, UsersGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  //@Profiles(
  //  UsersEnumerator.master,
  //  UsersEnumerator.member,
  //  UsersEnumerator.consumer,
  //  UsersEnumerator.guest,
  //)
  //@UseGuards(AuthGuard('authorizationKey'), AuthorizationGuard, UsersGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('phone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.usersService.findByPhone(phone)
  }

  //@Profiles(
  //  UsersEnumerator.master,
  //  UsersEnumerator.member,
  //  UsersEnumerator.consumer,
  //  UsersEnumerator.guest,
  //)
  //@UseGuards(AuthGuard('authorizationKey'), AuthorizationGuard, UsersGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  //@Profiles(UsersEnumerator.master)
  //@UseGuards(AuthGuard('authorizationKey'), AuthorizationGuard, UsersGuard)
  //@ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string, @Body() deleteUserDto: DeleteUserDto) {
    return this.usersService.remove(id, deleteUserDto)
  }
}
