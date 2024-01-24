import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

export class CreateUserDto {
  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  active: boolean

  @ApiPropertyOptional({ default: 'guest', enum: $Enums.UserProfile })
  @IsEnum($Enums.UserProfile)
  @IsOptional()
  profile: $Enums.UserProfile

  @ApiPropertyOptional()
  @IsOptional()
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

  @ApiProperty()
  @IsString()
  phone: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  password: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  document: string

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
  @IsNumber()
  @IsOptional()
  latitude: number

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  longitude: number
}
