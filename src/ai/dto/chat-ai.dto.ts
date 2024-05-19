import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, MinLength } from 'class-validator'

export class ChatAiDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId: string

  @ApiProperty()
  @MinLength(5)
  @IsString()
  content: string
}
