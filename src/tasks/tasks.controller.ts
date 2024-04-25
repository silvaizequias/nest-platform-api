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
import { TasksService } from './tasks.service'
import { UpdateTaskDto } from './dto/update-task.dto'
import { CreateTaskDto } from './dto/create-task.dto'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthorizationJWTGuard } from 'src/authorization/authorization.guard'
import { Profiles } from 'src/users/users.decorator'
import { UsersEnumerator } from 'src/users/users.enumerator'
import { UsersGuard } from 'src/users/users.guard'
import { DeleteTaskDto } from './dto/delete-task.dto'

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto)
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.tasksService.findAll()
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('code/:code')
  findByCode(@Param('code') code: string) {
    return this.tasksService.findByCode(code)
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id)
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto)
  }

  @Profiles(
    UsersEnumerator.master,
    UsersEnumerator.member,
    UsersEnumerator.consumer,
    UsersEnumerator.guest,
  )
  @UseGuards(AuthorizationJWTGuard, UsersGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string, @Body() deleteTaskDto: DeleteTaskDto) {
    return this.tasksService.remove(id, deleteTaskDto)
  }
}
