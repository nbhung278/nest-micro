import { Module } from '@nestjs/common';
import { LangchainController } from './langchain/langchain.controller';
import { LangchainService } from './langchain/langchain.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [LangchainController],
  providers: [LangchainService],
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
