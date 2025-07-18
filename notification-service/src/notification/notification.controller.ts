import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  @EventPattern('auth.register')
  handleUserCreated(@Payload() message: { email: string }) {
    console.log('📧 Sending email to:', message.email);
  }
}
