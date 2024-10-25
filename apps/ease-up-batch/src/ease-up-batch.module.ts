import { Module } from '@nestjs/common';
import { EaseUpBatchController } from './ease-up-batch.controller';
import { EaseUpBatchService } from './ease-up-batch.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [EaseUpBatchController],
  providers: [EaseUpBatchService],
})
export class EaseUpBatchModule {}
