import { Module } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { SubOrder } from './entities/subOrder.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.orders',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('ORDERS_DB_HOST'),
          port: config.get<number>('ORDERS_DB_PORT'),
          username: config.get<string>('ORDERS_DB_USERNAME'),
          password: config.get<string>('ORDERS_DB_PASSWORD'),
          database: config.get<string>('ORDERS_DB_DATABASE'),
          entities: [Order, SubOrder],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
