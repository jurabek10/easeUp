import { Module } from '@nestjs/common';
import { EaseUpBatchController } from './batch.controller';
import { EaseUpBatchService } from './batch.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot()],
	controllers: [EaseUpBatchController],
	providers: [EaseUpBatchService],
})
export class EaseUpBatchModule {}
