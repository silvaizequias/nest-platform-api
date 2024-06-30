import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreateArticleDto {
  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active: boolean

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  spotlight: boolean

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  private: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug: string

  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  subject: string

  @ApiProperty()
  @IsString()
  resume: string

  @ApiProperty()
  @IsString()
  content: string

  @ApiProperty()
  @IsString()
  tags: string
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
