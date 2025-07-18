import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  register(email: string) {
    console.log('created user', email);
  }
}
