import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('ai')
export class AiController {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('ai.chat');
    // this.kafkaClient.subscribeToResponseOf('ai.test');
    await this.kafkaClient.connect();
  }

  @Post('chat')
  chat(@Body() body: { message: string }) {
    return this.kafkaClient.send('ai.chat', {
      message: body.message,
    });
  }
}
