import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { AddressValidator } from 'src/location/location.validator'

export class CreateUserValidator extends PartialType(AddressValidator) {
  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  active: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastLogin: Date

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  role: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string

  @ApiProperty()
  @IsNotEmpty()
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
}

export class UpdateUserValidator extends PartialType(CreateUserValidator) {}

export class RemoveUserValidator {
  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  definitely: boolean
}
