import { Body, Controller, Post } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderBodyDto } from './dto/create/createOrder.item.dto';
import { AuthInfo } from '../decorators/user.decorator';
import { MessagePattern } from '@nestjs/microservices';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly storageService: OrdersService) {}

  @MessagePattern('create')
  async create(info: { data: unknown; userId: string }) {
    const { data, userId } = info;
    console.log(data, userId);
    // return this.storageService.create(data);
  }
}
