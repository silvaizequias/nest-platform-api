import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthLoginDto } from './auth.dto'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto)
  }
}
