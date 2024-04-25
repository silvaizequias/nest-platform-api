import { Injectable } from '@nestjs/common'
import { UpdateTaskDto } from './dto/update-task.dto'
import { CreateTaskDto } from './dto/create-task.dto'
import { findTaskByCode, findTaskById, findTasks } from './repositories/GET'
import { removeTask } from './repositories/DELETE'
import { DeleteTaskDto } from './dto/delete-task.dto'
import { createTask } from './repositories/POST'
import { updateTask } from './repositories/PATCH'

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto) {
    return createTask(createTaskDto)
  }

  findAll() {
    return findTasks()
  }

  findByCode(code: string) {
    return findTaskByCode(code)
  }

  findOne(id: string) {
    return findTaskById(id)
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return updateTask(id, updateTaskDto)
  }

  remove(id: string, deleteTaskDto: DeleteTaskDto) {
    return removeTask(id, deleteTaskDto)
  }
}
