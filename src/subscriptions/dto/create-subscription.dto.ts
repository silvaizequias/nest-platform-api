import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Decimal, DecimalJsLike } from '@prisma/client/runtime/library'
import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateSubscriptionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  code: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customerId: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subscriptionId: string

  @ApiProperty()
  @IsString()
  organizationDocument: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  recurrence: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  currentPeriodEnd: Date

  @ApiPropertyOptional({ default: 10000 })
  @IsOptional()
  @IsNumber()
  spendLimit: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  spending: number

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  spendExceeded: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false })
  price: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  priceId: string
}
