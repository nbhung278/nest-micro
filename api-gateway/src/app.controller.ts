// app.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller('auth')
export class AppController {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('auth_register');
    await this.kafkaClient.connect();
  }

  @Post('register')
  register(@Body() body: { count: number }) {
    console.log('call register', body);
    const start = Date.now();

    for (let i = 0; i < body.count; i++) {
      this.kafkaClient.emit('auth.register', {
        email: `Message ${i}`,
        key: 'test',
      });
    }

    const end = Date.now();
    return { sent: body.count, timeMs: end - start };
  }
}
