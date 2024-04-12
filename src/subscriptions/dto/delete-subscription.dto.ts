import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'

export class DeleteSubscriptionDto {
  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  definitely: boolean
}
