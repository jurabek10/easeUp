import { NestFactory } from '@nestjs/core';
import { EaseUpBatchModule } from './batch.module';

async function bootstrap() {
	const app = await NestFactory.create(EaseUpBatchModule);
	await app.listen(process.env.PORT_BATCH ?? 3000);
}
bootstrap();
