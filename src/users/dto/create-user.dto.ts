import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

export class CreateUserDto {
  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean

  @ApiPropertyOptional({ default: 'USER', enum: ['USER', 'MASTER'] })
  @IsString()
  @IsOptional()
  profile: string

  @ApiProperty()
  @IsString()
  name: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @Length(11)
  phone: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
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
