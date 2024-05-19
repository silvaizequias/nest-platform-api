import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { BaseMessageFields, SystemMessage } from '@langchain/core/messages'
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts'
import { ChatAiDto } from './dto/chat-ai.dto'
import { AiModel } from './ai.model'
import { AiPrompt } from './ai.prompt'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AiService {
  constructor(
    private readonly aiModel: AiModel,
    private readonly aiPrompt: AiPrompt,
    private readonly prismaService: PrismaService,
  ) {}

  private readonly message = SystemMessagePromptTemplate.fromTemplate('{text}')
  private readonly history = new Array<BaseMessageFields>()
  private readonly chat = this.aiModel.bedrockChat()

  async aiChat(chatAiDto: ChatAiDto) {
    try {
      const userId = chatAiDto?.userId
      const userContent = chatAiDto?.content

      const user = await this.prismaService.user.findFirst({
        where: { id: userId },
      })
      if (!user) throw new NotFoundException(`user not found`)

      const assistantContent = this.aiPrompt.assistant(user?.name)

      const chatPrompt = ChatPromptTemplate.fromMessages([
        ['assistant', assistantContent],
        ['user', userContent],
      ])
      await this.message
        .format({
          text: userContent,
        })
        .then((data) =>
          this.history.push({
            content: data.content,
            name: user?.name,
            additional_kwargs: {
              userId,
            },
          }),
        )

      const formattedChatPrompt = await chatPrompt.invoke(this.history)

      const systemContent = await this.chat.invoke(formattedChatPrompt)

      await this.message
        .format({
          text: systemContent.content,
        })
        .then((data) =>
          this.history.push({ content: data.content, name: 'assistant' }),
        )

      return new SystemMessage({
        content: systemContent.content,
        name: 'Assistente Dedicado',
      }).lc_kwargs
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }
}
