import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'

export class AuthLoginDto {
  @ApiProperty()
  @IsString()
  @MinLength(10)
  @MaxLength(13)
  phone: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  secret: string
}
