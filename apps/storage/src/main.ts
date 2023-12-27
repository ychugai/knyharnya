import { NestFactory } from '@nestjs/core';

import { StorageModule } from './storage.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(StorageModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.STORAGE_HOST,
      port: process.env.STORAGE_PORT,
    },
  });
  app.listen();
}
bootstrap();
