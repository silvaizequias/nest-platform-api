import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator'
import { $Enums } from '@prisma/client'

export class CreateMemberDto {
  @ApiPropertyOptional({ default: true, readOnly: true })
  @IsBoolean()
  @IsOptional()
  active: boolean

  @ApiPropertyOptional({ default: 'client', enum: $Enums.MemberRole })
  @IsString()
  role: $Enums.MemberRole

  @ApiProperty()
  @IsString()
  userPhone: string

  @ApiProperty()
  @IsString()
  @Length(14)
  organizationDocument: string
}
