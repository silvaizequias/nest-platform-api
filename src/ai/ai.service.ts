import { HttpException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { BedrockChat } from '@langchain/community/chat_models/bedrock'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { awsBedrockModel } from 'src/helpers'
import { ChatAiDto } from './dto/chat-ai.dto'

@Injectable()
export class AiService {
  constructor(private readonly configService: ConfigService) {}

  private readonly bedrockChat = new BedrockChat({
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

  async aiChat(chatAiDto: ChatAiDto) {
    try {
      const ai = await this.bedrockChat.invoke([
        new SystemMessage({
          content:
            'Você é um Assistente Virtual chamado Dedicado e deverá responder as dúvidas de forma descontraída com um tom bem humorado.',
          name: 'Assistente Dedicado',
        }),
        new HumanMessage({
          content: chatAiDto?.content,
          name: chatAiDto?.user,
        }),
      ])

      return new SystemMessage({
        content: ai.content,
        name: 'Assistente Dedicado',
      }).lc_kwargs
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }
}
