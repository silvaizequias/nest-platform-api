import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsPhoneNumber, MinLength, MaxLength } from 'class-validator'

export class LoginUserDto {
  @ApiProperty()
  @IsString()
  @IsPhoneNumber('BR')
  phone: string

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(25)
  password: string
}
