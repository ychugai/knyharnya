import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserBodyDto } from './dto/create/create.user.dto';
import generateHash from '../helpers/password/generateHash';
import UserRole from './enums/user.role.enum';

@Controller('/auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserBodyDto) {
    const { password, ...rest } = body;
    const { passwordHash, passwordSalt } = await generateHash(password);

    const user = {
      ...rest,
      passwordHash,
      passwordSalt,
      role: UserRole.USER,
    };

    return this.usersService.create(user);
  }

}
