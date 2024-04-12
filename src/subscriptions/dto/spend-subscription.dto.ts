import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class SpendSubscriptionDto {
  @ApiProperty()
  @IsString()
  authorizationKey: string

  @ApiProperty()
  @IsNumber()
  spend: number
}
