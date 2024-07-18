import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator'
import { AddressValidator } from 'src/location/location.validator'

export class CreateOrganizationValidator extends PartialType(AddressValidator) {
  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  active: boolean

  @ApiPropertyOptional()
  @IsOptional()
  key: string

  @ApiPropertyOptional()
  @IsOptional()
  name: string

  @ApiPropertyOptional()
  @IsOptional()
  image: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email: string

  @ApiPropertyOptional()
  @IsOptional()
  phone: string

  @ApiProperty()
  @IsNotEmpty()
  document: string
}

export class UpdateOrganizationValidator extends PartialType(
  CreateOrganizationValidator,
) {}

export class RemoveOrganizationValidator {
  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  definitely: boolean
}
