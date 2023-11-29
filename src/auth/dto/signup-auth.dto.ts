import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator'

export class SignUpAuthDto {
  @ApiProperty()
  @IsString()
  name: string

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
  @MinLength(8)
  @MaxLength(25)
  password: string
}
