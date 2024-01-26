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
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/phone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.usersService.findByPhone(phone)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
