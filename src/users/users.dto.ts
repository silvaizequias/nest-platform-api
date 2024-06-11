import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { UsersRoleEnum } from './users.enumerator'
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty()
  @IsEnum(UsersRoleEnum)
  @IsString()
  role: string

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active: boolean

  @ApiProperty()
  @MinLength(5)
  @IsString()
  name: string

  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string

  @ApiProperty()
  @MinLength(10)
  @MaxLength(13)
  @IsString()
  phone: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  secret: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class DeleteUserDto {
  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  soft: boolean
}
