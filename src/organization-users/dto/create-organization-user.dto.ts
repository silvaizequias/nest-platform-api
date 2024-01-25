import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreateOrganizationUserDto {
  @ApiProperty()
  @IsString()
  organizationDocument: string

  @ApiProperty()
  @IsString()
  userPhone: string

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  active: boolean

  @ApiPropertyOptional({
    default: 'client',
    enum: $Enums.UserRole,
  })
  @IsString()
  @IsOptional()
  role: $Enums.UserRole
}
