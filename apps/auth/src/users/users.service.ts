import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { CommonEntity } from './entities/common.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(User);
  }
  private readonly repository: Repository<User>;

  async create(data: Omit<User, keyof CommonEntity>) {
    const created = await this.repository.save(data);
    return created;
  }

  findById(data: Pick<User, 'id'>) {
    return this.repository.findOneBy(data);
  }

  findByEmail(data: Pick<User, 'email'>) {
    return this.repository.findOneBy(data);
  }
}
