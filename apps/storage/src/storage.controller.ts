import { Body, Controller, Post } from '@nestjs/common';

import { StorageService } from './storage.service';
import { AddItemBodyDto } from './dto/create/add.item.dto';
import { AddQuantityItemBodyDto } from './dto/create/addQuantity.item.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('/storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @MessagePattern('add')
  async add(data: AddItemBodyDto) {
    return this.storageService.create(data);
  }

  @MessagePattern('quantity')
  async addQuantity(data: AddQuantityItemBodyDto) {
    return this.storageService.increaseQuantity(data.id, data.quantity);
  }

  @MessagePattern('find')
  async find() {
    return this.storageService.findAll();
  }
}
