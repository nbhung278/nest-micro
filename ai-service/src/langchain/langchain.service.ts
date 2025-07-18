import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLangchainChatDto } from './dto/create-langchain-chat.dto';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { TEMPLATES } from '../utils/constants/templates';
import { openAI } from '../utils/constants/openAI';
import customMessage from '../utils/responses/customMessage';
@Injectable()
export class LangchainService {
  async chat(createLangchainChatDto: CreateLangchainChatDto) {
    try {
      const prompt = PromptTemplate.fromTemplate(TEMPLATES.BASIC_CHAT_TEMPLATE);

      const model = new ChatOpenAI({
        temperature: +openAI.BASIC_CHAT_OPENAI_TEMPERATURE,
        model: openAI.GPT_3_5_TURBO_1106,
        cache: true,
      });

      const outputParser = new HttpResponseOutputParser();
      const chain = prompt.pipe(model).pipe(outputParser);
      const response = await chain.invoke({
        input: createLangchainChatDto.message,
      });

      const message =
        typeof response === 'string'
          ? response
          : Buffer.from(Object.values(response)).toString('utf8');

      return customMessage(HttpStatus.OK, 'Success', message);
    } catch (error) {
      throw new HttpException(
        `Internal server error ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
