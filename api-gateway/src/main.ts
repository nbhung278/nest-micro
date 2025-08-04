// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  // Connect Kafka
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'api-gateway',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'api-gateway-consumer',
      },
    },
  });

  // Connect gRPC
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'ai',
      protoPath: join(__dirname, '../../proto/ai.proto'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(8000);
}
bootstrap().catch((error) => console.error('Error api-gateway server', error));
