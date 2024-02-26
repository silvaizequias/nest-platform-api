import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { LoginAuthDto } from './dto/login-auth.dto'
import { PasswordResetAuthDto } from './dto/password-reset-auth.dto'
import { RegisterAuthDto } from './dto/register-auth.dto'

@ApiTags('')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  public async signIn(@Body() loginAuthDto: LoginAuthDto): Promise<any> {
    return this.authService.login(loginAuthDto)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  public async signUp(@Body() registerAuthDto: RegisterAuthDto): Promise<any> {
    return this.authService.register(registerAuthDto)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('password-reset')
  public async passwordReset(
    @Body() passwordResetAuthDto: PasswordResetAuthDto,
  ): Promise<any> {
    return this.authService.passwordReset(passwordResetAuthDto)
  }
}
