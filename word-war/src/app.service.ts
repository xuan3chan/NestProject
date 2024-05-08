import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! chao xuan';
  }

  // New method
  getGoodbye(): string {
    return 'Goodbye World!';
  }
}