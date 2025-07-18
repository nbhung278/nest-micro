import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @EventPattern('auth.register')
  handleUserCreated(@Payload() message: { email: string; key: string }) {
    console.log('handleUserCreated', message.email);
    this.authService.register(message.email);
  }
}
