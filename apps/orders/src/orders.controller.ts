import { Body, Controller, Post } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderBodyDto } from './dto/create/createOrder.item.dto';
import { AuthInfo } from '../decorators/user.decorator';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly storageService: OrdersService) {}

  @Post()
  async add(
    @Body() body: CreateOrderBodyDto,
    @AuthInfo() authInfo: { userId },
  ) {
    const data = {
      ...body,
      userId: authInfo.userId,
    };
    return this.storageService.create(data);
  }
}
