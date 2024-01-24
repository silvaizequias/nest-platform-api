import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class PasswordResetAuthDto {
  @ApiProperty()
  @IsString()
  phone: string
}
