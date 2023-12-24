import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayController } from './gateway.controller';

// import { UsersModule } from './users/users.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_HOST,
          port: Number(process.env.AUTH_PORT),
        },
      },
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.ORDERS_HOST,
          port: Number(process.env.ORDERS_PORT),
        },
      },
      {
        name: 'STORAGE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.STORAGE_HOST,
          port: Number(process.env.STORAGE_PORT),
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [],
})
export class GatewayModule {}
