import { ApiPropertyOptional } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'
import {
  IsEnum,
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Length,
} from 'class-validator'

export class ImportMemberDto {
  @ApiPropertyOptional({
    default: 'member',
    enum: $Enums.UserProfile,
  })
  @IsEnum($Enums.UserProfile)
  @IsOptional()
  @IsEnum($Enums.UserProfile)
  profile: $Enums.UserProfile

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string

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
  passHash: string

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
}
