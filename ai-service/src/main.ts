import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Kết nối Kafka
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'ai-consumer-server',
      },
    },
  });

  // Connect gRPC
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'ai',
      protoPath: join(__dirname, 'proto/ai.proto'),
      url: '0.0.0.0:50051',
    },
  });

  await app.startAllMicroservices();
}
bootstrap().catch(console.error);
