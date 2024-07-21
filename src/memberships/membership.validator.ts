import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateMembershipValidator {
  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  active: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  role: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userPhone: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  organizationDocument: string
}

export class UpdateMembershipValidator extends PartialType(
  CreateMembershipValidator,
) {}

export class RemoveMembershipValidator {
  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  definitely: boolean
}
