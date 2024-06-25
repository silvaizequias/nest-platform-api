import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'

import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { UserRole } from './user.enum'

export class CreateUserDto {
  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active: boolean

  @ApiPropertyOptional({ enum: UserRole, default: 'guest' })
  @IsOptional()
  @IsEnum(UserRole)
  @IsString()
  role: UserRole

  @ApiProperty()
  @IsString()
  name: string

  @ApiPropertyOptional()
  @IsString()
  image: string

  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  phone: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  secret: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  document: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zipCode: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  street: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  complement: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  district: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  state: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  latitude: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  longitude: number
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
