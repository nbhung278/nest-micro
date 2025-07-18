import { Controller } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateLangchainChatDto } from './dto/create-langchain-chat.dto';

@Controller()
export class LangchainController {
  constructor(private readonly langchainService: LangchainService) {}

  @MessagePattern('ai.chat')
  async createChat(@Payload() createLangchainChatDto: CreateLangchainChatDto) {
    return await this.langchainService.chat(createLangchainChatDto);
  }
}
