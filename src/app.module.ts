import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UploadsModule } from './uploads/uploads.module'
import { GenerativesModule } from './generatives/generatives.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UploadsModule,
    GenerativesModule,
  ],
  providers: [],
})
export class AppModule {}
