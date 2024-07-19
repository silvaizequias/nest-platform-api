import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AuthJwtStrategy } from './auth.strategy'
import { JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { SendersService } from 'src/senders/senders.service'
import { AWSService } from 'src/aws/aws.service'
import { UsersService } from 'src/users/users.service'
import { LocationService } from 'src/location/location.service'

@Module({
  imports: [PassportModule],
  providers: [
    AuthService,
    AuthJwtStrategy,
    JwtService,
    AWSService,
    SendersService,
    UsersService,
    LocationService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
