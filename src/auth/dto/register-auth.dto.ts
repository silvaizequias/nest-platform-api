import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class RegisterAuthDto {
  @ApiPropertyOptional({ default: '52378516000178' })
  @IsOptional()
  @IsString()
  organizationDocument: string

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  phone: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(25)
  password: string
}
