import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsString()
  @Length(14)
  organizationDocument: string

  @ApiPropertyOptional({ default: true, readOnly: true })
  @IsBoolean()
  @IsOptional()
  active: boolean

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  paymentCustomerId: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  paymentSubscriptionId: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  paymentPriceId: string

  @ApiPropertyOptional({ default: 100 })
  @IsNumber()
  @IsOptional()
  credit: number

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  unlimited: boolean
}
