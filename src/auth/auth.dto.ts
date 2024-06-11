import { IsString, MaxLength, MinLength } from 'class-validator'

export class AuthLoginDto {
  @IsString()
  @MinLength(10)
  @MaxLength(13)
  phone: string

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  secret: string
}
