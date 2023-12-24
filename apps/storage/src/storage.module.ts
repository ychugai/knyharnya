import { Module } from '@nestjs/common';

import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { StorageTcpController } from './storage.tcp.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('STORAGE_DB_HOST'),
          port: config.get<number>('STORAGE_DB_PORT'),
          username: config.get<string>('STORAGE_DB_USERNAME'),
          password: config.get<string>('STORAGE_DB_PASSWORD'),
          database: config.get<string>('STORAGE_DB_DATABASE'),
          entities: [Item],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [StorageController, StorageTcpController],
  providers: [StorageService],
})
export class StorageModule {}
