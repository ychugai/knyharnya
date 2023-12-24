import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserBodyDto } from '../dto/user/create/create.user.dto';
import { toSuccess } from '../helpers/successResponse';

@Controller()
export class GatewayController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.authClient.connect();
  }

  @Post('/auth/signup')
  async signup(@Body() data: CreateUserBodyDto) {
    try {
      const res = await this.authClient.send('signup', data).toPromise();
      console.log(res);
      return toSuccess(res);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Post('/auth/login')
  async login(@Body() data: CreateUserBodyDto) {
    try {
      const res = await this.authClient.send('login', data).toPromise();
      console.log(res);
      return toSuccess(res);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
