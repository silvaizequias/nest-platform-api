import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator'

export class CreateOrganizationKeyDto {
  @ApiProperty()
  @IsString()
  organizationDocument: string

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  expireIn: Date

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  active: boolean
}
