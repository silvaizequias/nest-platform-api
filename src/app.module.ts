import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UploadsModule } from './uploads/uploads.module'
import { AWSModule } from './aws/aws.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UploadsModule,
    AWSModule,
  ],
  providers: [],
})
export class AppModule {}
