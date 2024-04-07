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
  @ApiPropertyOptional({ default: true, readOnly: true })
  @IsBoolean()
  @IsOptional()
  active: boolean

  @ApiPropertyOptional({ readOnly: true })
  @IsString()
  @IsOptional()
  authorizationKey: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
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
  phone: string

  @ApiProperty()
  @IsString()
  @Length(14)
  document: string

  @ApiProperty()
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
  @IsNumber()
  @IsOptional()
  latitude: number

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  longitude: number
}
