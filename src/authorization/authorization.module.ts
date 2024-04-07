import { Module } from '@nestjs/common'
import { AuthorizationService } from './authorization.service'
import { PassportModule } from '@nestjs/passport'
import { AuthorizationStrategy } from './authorization.strategy'

@Module({
  imports: [PassportModule],
  providers: [AuthorizationService, AuthorizationStrategy],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
