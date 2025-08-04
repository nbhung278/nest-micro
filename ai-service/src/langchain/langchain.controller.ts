import { Controller } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateLangchainChatDto } from './dto/create-langchain-chat.dto';
import { ApiResponse } from '../utils/responses/customMessage';

@Controller()
export class LangchainController {
  constructor(private readonly langchainService: LangchainService) {}

  @MessagePattern('ai.chat')
  async createChat(@Payload() createLangchainChatDto: CreateLangchainChatDto) {
    return await this.langchainService.chat(createLangchainChatDto);
  }

  @GrpcMethod('AiService', 'Chat')
  async chat(data: { message: string }): Promise<ApiResponse<string>> {
    return await this.langchainService.chat(data);
  }
}
