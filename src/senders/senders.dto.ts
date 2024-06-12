import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class SendEmailDto {
  @ApiProperty()
  @IsString()
  to: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bcc: string

  @ApiProperty()
  @IsString()
  subject: string

  @ApiProperty()
  @IsString()
  from: string

  @ApiProperty()
  @IsString()
  message: string
}

export class SendSMSDto {
  @ApiProperty()
  @IsString()
  to: string

  @ApiProperty()
  @IsString()
  message: string
}
