import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { SignInAuthDto } from './dto/signin-auth.dto'
import { SignUpAuthDto } from './dto/signup-auth.dto'
import { PasswordResetAuthDto } from './dto/password-reset-auth.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signin')
  public async signIn(@Body() signInAuthDto: SignInAuthDto): Promise<any> {
    return this.authService.signIn(signInAuthDto)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  public async signUp(@Body() signUpAuthDto: SignUpAuthDto): Promise<any> {
    return this.authService.signUp(signUpAuthDto)
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
