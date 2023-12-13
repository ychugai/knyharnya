import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { StorageService } from './storage.service';
import { Item } from './entities/item.entity';

@Controller()
export class StorageTcpController {
  constructor(private readonly storageService: StorageService) {}

  @EventPattern('orderCreated')
  orderCreated(@Payload() items: Array<Pick<Item, 'id' | 'quantity'>>) {
    return Promise.all(
      items.map((item) =>
        this.storageService.decreaseQuantity(item.id, item.quantity),
      ),
    );
  }
}
