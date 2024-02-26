import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'

export class LoginAuthDto {
  @ApiProperty()
  @IsString()
  phone: string

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(25)
  password: string
}
