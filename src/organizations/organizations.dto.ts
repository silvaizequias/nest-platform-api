import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import {
  IsOptional,
  IsBoolean,
  IsString,
  IsEmail,
  IsNumber,
} from 'class-validator'

export class CreateOrganizationDto {
  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active: boolean

  @ApiProperty()
  @IsString()
  name: string

  @ApiPropertyOptional()
  @IsString()
  image: string

  @ApiPropertyOptional()
  @IsEmail()
  @IsString()
  email: string

  @ApiPropertyOptional()
  @IsOptional()
  phone: string

  @ApiProperty()
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

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}
