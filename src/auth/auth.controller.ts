import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCodeValidator, AuthLoginValidator } from './auth.validator'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() authLoginValidator: AuthLoginValidator) {
    return this.authService.login(authLoginValidator)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('code')
  async code(@Body() authCodeValidator: AuthCodeValidator) {
    return this.authService.code(authCodeValidator)
  }
}
