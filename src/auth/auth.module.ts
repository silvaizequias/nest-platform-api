import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { LocalAuthStrategy } from './strategies/local-auth.strategy'
import { PassportModule } from '@nestjs/passport'
import { PrismaModule } from 'src/prisma/prisma.module'
import { JwtModule } from '@nestjs/jwt'
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy'

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '14d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, JwtAuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
