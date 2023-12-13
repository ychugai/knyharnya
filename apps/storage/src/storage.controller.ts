import { Body, Controller, Post } from '@nestjs/common';

import { StorageService } from './storage.service';
import { AddItemBodyDto } from './dto/create/add.item.dto';
import { AddQuantityItemBodyDto } from './dto/create/addQuantity.item.dto';

@Controller('/storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  async add(@Body() body: AddItemBodyDto) {
    return this.storageService.create(body);
  }

  @Post('/quantity')
  async addQuantity(@Body() body: AddQuantityItemBodyDto) {
    return this.storageService.increaseQuantity(body.id, body.quantity);
  }
}
