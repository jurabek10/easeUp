import { Injectable } from '@nestjs/common';

@Injectable()
export class EaseUpBatchService {
  getHello(): string {
    return 'Welcome to EaseUp BATCH Server';
  }
}
