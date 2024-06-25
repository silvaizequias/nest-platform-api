import { ApiProperty, PartialType } from '@nestjs/swagger'
import { MemberRole } from './member.enum'
import { IsBoolean, IsEnum, IsString } from 'class-validator'

export class CreateMemberDto {
  @ApiProperty({ enum: MemberRole, default: 'member' })
  @IsEnum(MemberRole)
  @IsString()
  role: MemberRole

  @ApiProperty({ default: true })
  @IsBoolean()
  active: boolean

  @ApiProperty()
  @IsString()
  userId: string

  @ApiProperty()
  @IsString()
  companyId: string
}

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
