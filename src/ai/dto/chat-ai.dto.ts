import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ChatAiDto {
  @ApiProperty()
  @IsString()
  user: string

  @ApiProperty()
  @IsString()
  content: string
}
