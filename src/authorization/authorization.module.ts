import { Module } from '@nestjs/common'
import { AuthorizationService } from './authorization.service'
import { PassportModule } from '@nestjs/passport'
import { AuthorizationApiKeyStrategy } from './authorization-api-key.strategy'
import { AuthorizationJwtStrategy } from './authorization-jwt.strategy'

@Module({
  imports: [PassportModule],
  providers: [
    AuthorizationService,
    AuthorizationApiKeyStrategy,
    AuthorizationJwtStrategy,
  ],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
