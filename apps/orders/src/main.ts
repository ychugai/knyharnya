import { NestFactory } from '@nestjs/core';

import { OrdersModule } from './orders.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrdersModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.ORDERS_HOST,
      port: process.env.ORDERS_PORT,
    },
  });
  app.listen();
}
bootstrap();
