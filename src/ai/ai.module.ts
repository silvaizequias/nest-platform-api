import { Module } from '@nestjs/common'
import { AiService } from './ai.service'
import { AiController } from './ai.controller'
import { AiPrompt } from './ai.prompt'
import { AiModel } from './ai.model'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  providers: [AiModel, AiPrompt, AiService, PrismaService],
  controllers: [AiController],
})
export class AiModule {}
