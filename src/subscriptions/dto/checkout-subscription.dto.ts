import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator'

export class CheckoutSubscriptionDto {
  @ApiProperty()
  @IsString()
  @MinLength(11)
  @MaxLength(14)
  document: string

  @ApiProperty({ default: 100 })
  @Min(100)
  @IsNumber()
  credit: number

  @ApiProperty({ default: 'https://dedicado.digital' })
  @IsString()
  url: string
}
