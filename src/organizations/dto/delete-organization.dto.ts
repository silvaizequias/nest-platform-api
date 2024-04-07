import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'

export class DeleteOrganizationDto {
  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  definitely: boolean
}
