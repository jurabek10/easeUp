import { NestFactory } from '@nestjs/core';
import { BatchModule } from './batch.module';

async function bootstrap() {
	const app = await NestFactory.create(BatchModule);
	await app.listen(process.env.PORT_BATCH ?? process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
