import { BedrockChat } from '@langchain/community/chat_models/bedrock'
import { ConfigService } from '@nestjs/config'
import { awsBedrockModel } from 'src/helpers'

export class AiModel {
  constructor(private readonly configService: ConfigService) {}

  bedrockChat() {
    return new BedrockChat({
      model: awsBedrockModel.titanTextPremier,
      region: this.configService.getOrThrow('AWS_BEDROCK_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('AWS_PRIVATE_KEY'),
      },
      maxTokens: 1024,
      temperature: 0.7,
      streaming: false,
    })
  }
}
