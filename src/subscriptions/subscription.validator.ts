import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateSubscriptionValidator {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  organizationId: string

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  active: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentGateway: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentCustomerId: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentSubscriptionId: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentPriceId: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  credit: number

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  unlimited: boolean
}

export class UpdateSubscriptionValidator extends PartialType(
  CreateSubscriptionValidator,
) {}

export class RemoveSubscriptionValidator {
  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  definitely: boolean
}
