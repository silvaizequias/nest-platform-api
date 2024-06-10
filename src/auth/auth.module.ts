import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AuthJwtStrategy } from './auth.strategy'
import { JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [PassportModule],
  providers: [AuthService, AuthJwtStrategy, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
