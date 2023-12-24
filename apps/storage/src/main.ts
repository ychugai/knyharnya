import { NestFactory } from '@nestjs/core';

import { StorageModule } from './storage.module';

async function bootstrap() {
  const app = await NestFactory.create(StorageModule);
  await app.listen(process.env.STORAGE_PORT);
}
bootstrap();
