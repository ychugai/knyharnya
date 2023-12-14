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

  create(data: Omit<User, keyof CommonEntity>) {
    return this.repository.save(data);
  }

  findById(data: Pick<User, 'id'>) {
    return this.repository.findOneBy(data);
  }
}
