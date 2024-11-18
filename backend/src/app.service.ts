import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Ta funcionando essa desgraça! ;)';
  }
}
