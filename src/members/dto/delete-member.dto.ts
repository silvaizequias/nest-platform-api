import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'

export class DeleteMemberDto {
  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  definitely: boolean
}
