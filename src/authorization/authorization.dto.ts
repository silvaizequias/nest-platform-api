import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class AuthorizationDto {
  @ApiProperty()
  @IsString()
  key: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  host: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  method: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  url: string
}
