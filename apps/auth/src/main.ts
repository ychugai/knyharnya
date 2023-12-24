import { NestFactory } from '@nestjs/core';

import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.AUTH_HOST,
      port: process.env.AUTH_PORT,
    },
  });
  app.listen();
}
bootstrap();
