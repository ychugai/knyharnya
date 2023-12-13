import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { Item } from './entities/item.entity';
import { CommonEntity } from './entities/common.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StorageService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(Item);
  }
  private readonly repository: Repository<Item>;

  create(data: Omit<Item, keyof CommonEntity>) {
    return this.repository.save(data);
  }

  increaseQuantity(id: string, quantity: number) {
    return this.repository.increment({ id }, 'quantity', quantity);
  }

  decreaseQuantity(id: string, quantity: number) {
    return this.repository.increment({ id }, 'quantity', quantity);
  }

  findById(data: Pick<Item, 'id'>) {
    return this.repository.findOneBy(data);
  }

  findByName(data: Pick<Item, 'name'>) {
    return this.repository.findBy(data);
  }
}
