import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CheckoutValidator {
  @ApiProperty()
  @IsString()
  credit: number

  @ApiProperty()
  @IsNumber()
  document: string
}
