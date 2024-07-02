import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, MaxLength, MinLength } from 'class-validator'

export class AuthLoginDto {
  @ApiProperty()
  @IsString()
  @MinLength(11)
  @MaxLength(13)
  phone: string

  @ApiProperty()
  @IsString()
  @Length(6)
  code: string
}

export class AuthCodeDto {
  @ApiProperty()
  @IsString()
  @MinLength(11)
  @MaxLength(13)
  phone: string
}
