import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator'

export class CreateOrganizationUserDto {
  @ApiProperty()
  @IsString()
  organizationCode: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  userEmail: string

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean

  @ApiPropertyOptional({
    default: 'GUEST',
    enum: ['GUEST', 'CUSTOMER', 'MEMBER', 'ADMINISTRATOR', 'OWNER'],
  })
  @IsString()
  @IsOptional()
  role: string
}
