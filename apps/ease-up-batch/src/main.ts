import { NestFactory } from '@nestjs/core';
import { EaseUpBatchModule } from './ease-up-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(EaseUpBatchModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
