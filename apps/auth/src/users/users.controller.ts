import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserBodyDto } from './dto/create/create.user.dto';
import generateHash from '../helpers/password/generateHash';
import UserRole from './enums/user.role.enum';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { verify } from 'crypto';
import verifyPassword from '../helpers/password/verifyPassword';
import generateJwt from '../helpers/jwt/generateJwt';

@Controller('/auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('signup')
  async signup(data: CreateUserBodyDto) {
    const existed = await this.usersService.findByEmail({ email: data.email });

    if (existed) throw new RpcException('User already exists');

    const { password, ...rest } = data;
    const { passwordHash, passwordSalt } = await generateHash(password);

    const user = {
      ...rest,
      passwordHash,
      passwordSalt,
      role: UserRole.USER,
    };

    return this.usersService.create(user);
  }

  @MessagePattern('login')
  async login(data: CreateUserBodyDto) {
    const user = await this.usersService.findByEmail({ email: data.email });

    if (!user) throw new RpcException('User not found');

    const { passwordHash, passwordSalt } = user;

    const { password } = data;
    const verified = verifyPassword(password, passwordSalt, passwordHash);
    if (!verified) throw new RpcException('Wrong password');

    const tokens = generateJwt(
      { id: user.id, role: user.role },
      process.env.AUTH_JWT_SECRET,
    );
    return tokens;
  }
}
