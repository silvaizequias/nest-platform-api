import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class AddressValidator {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zipCode: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  street: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  complement: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  district: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  state: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  latitude: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  longitude: number
}
