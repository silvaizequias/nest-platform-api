import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UploadFileValidator {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  bucket: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  path: string
}
