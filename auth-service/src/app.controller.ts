import { Controller } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}
}
