import { Controller, Get } from '@nestjs/common';
import { EaseUpBatchService } from './ease-up-batch.service';

@Controller()
export class EaseUpBatchController {
  constructor(private readonly easeUpBatchService: EaseUpBatchService) {}

  @Get()
  getHello(): string {
    return this.easeUpBatchService.getHello();
  }
}
