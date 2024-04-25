import { $Enums, Task } from '@prisma/client'

export class TaskEntity implements Task {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  userId: string
  code: string
  priority: $Enums.TaskPriority
  status: $Enums.TaskStatus
  subject: string
  content: string
  deadline: Date
}
