import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

export class CreateOrganizationDto {
  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean

  @ApiProperty()
  @IsString()
  name: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsEmail()
  email: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Length(11)
  phone: string

  @ApiPropertyOptional()
  @IsString()
  documentCode: string

  @ApiPropertyOptional()
  @IsString()
  @Length(8)
  @IsOptional()
  zipCode: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  street: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  complement: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  district: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  state: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  country: string

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  latitude: number

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  longitude: number
}
