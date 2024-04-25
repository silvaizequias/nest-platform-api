import { ApiPropertyOptional } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @ApiPropertyOptional({ default: true, readOnly: true })
  @IsBoolean()
  @IsOptional()
  active: boolean

  @ApiPropertyOptional({ default: false, readOnly: true })
  @IsBoolean()
  @IsOptional()
  available: boolean

  @ApiPropertyOptional({
    default: 'guest',
    enum: $Enums.UserProfile,
    readOnly: true,
  })
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

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(25)
  password: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(11)
  @MaxLength(14)
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
