import { Module } from '@nestjs/common';
import { EaseUpBatchController } from './ease-up-batch.controller';
import { EaseUpBatchService } from './ease-up-batch.service';

@Module({
  imports: [],
  controllers: [EaseUpBatchController],
  providers: [EaseUpBatchService],
})
export class EaseUpBatchModule {}
