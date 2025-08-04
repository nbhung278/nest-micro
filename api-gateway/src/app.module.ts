// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AiController } from './ai/ai.controller';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
      {
        name: 'AI_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'ai',
          protoPath: join(__dirname, '../../proto/ai.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [AppController, AiController],
})
export class AppModule {}
