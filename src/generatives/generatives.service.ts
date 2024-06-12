import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GenerativesService {
  constructor(private readonly configService: ConfigService) {}

  private readonly bedrockRuntimeClient = new BedrockRuntimeClient({
    region: this.configService.getOrThrow('AWS_BEDROCK_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow('AWS_PRIVATE_KEY'),
    },
  })
}
