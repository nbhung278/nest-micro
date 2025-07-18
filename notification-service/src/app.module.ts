import { Module } from '@nestjs/common';
import { NotificationController } from './notification/notification.controller';

@Module({
  controllers: [NotificationController],
})
export class AppModule {}
