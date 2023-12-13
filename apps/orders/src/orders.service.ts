import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { SubOrder } from './entities/subOrder.entity';
import { ClientProxy } from '@nestjs/microservices';
import { ItemDto } from '../../storage/src/dto/item.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @Inject('STORAGE_SERVICE')
    private readonly storageServiceClient: ClientProxy,
  ) {
    this.ordersRepository = this.dataSource.getRepository(Order);
    this.subOrdersRepository = this.dataSource.getRepository(SubOrder);
  }
  private readonly ordersRepository: Repository<Order>;
  private readonly subOrdersRepository: Repository<SubOrder>;

  async create(data: { userId: string; items: ItemDto[] }) {
    const { items } = data;
    const order = await this.ordersRepository.save({});
    await Promise.all(
      items.map((item) => {
        const { id: itemId, quantity } = item;
        return this.subOrdersRepository.save({
          itemId,
          quantity,
          order,
        });
      }),
    );
    this.storageServiceClient.emit('orderCreated', items);
    return this.ordersRepository.findOne({
      where: { id: order.id },
      relations: ['subOrders'],
    });
  }
}
