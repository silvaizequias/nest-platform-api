import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsOptional, IsString, Length } from 'class-validator'

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @Length(11)
  document: string

  @ApiProperty()
  @IsString()
  code: string

  @ApiPropertyOptional({
    default: 'normal',
    enum: $Enums.TaskPriority,
    readOnly: true,
  })
  @IsEnum($Enums.TaskPriority)
  @IsOptional()
  priority: $Enums.TaskPriority

  @ApiPropertyOptional({
    default: 'planning',
    enum: $Enums.TaskStatus,
    readOnly: true,
  })
  @IsEnum($Enums.TaskStatus)
  @IsOptional()
  status: $Enums.TaskStatus

  @ApiProperty()
  @IsString()
  subject: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deadline: Date
}
