import {
  Controller,
  Get,
  Query,
  Inject,
  OnModuleInit,
  Post,
  Body,
} from '@nestjs/common';
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface AiService {
  GetReply(data: { message: string }): Observable<{ reply: string }>;
}

@Controller('ai')
export class AiController implements OnModuleInit {
  private aiService: AiService;

  constructor(
    @Inject('AI_PACKAGE') private client: ClientGrpc,
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.aiService = this.client.getService<AiService>('AiService');
    this.kafkaClient.subscribeToResponseOf('ai.chat');
    // this.kafkaClient.subscribeToResponseOf('ai.test');
    await this.kafkaClient.connect();
  }

  @Get('reply')
  getReply(@Query('message') message: string) {
    return this.aiService.GetReply({ message });
  }

  @Post('chat')
  chat(@Body() body: { message: string }) {
    return this.kafkaClient.send('ai.chat', {
      message: body.message,
    });
  }
}
