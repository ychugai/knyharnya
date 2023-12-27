import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserBodyDto } from '../dto/user/create/create.user.dto';
import { toSuccess } from '../helpers/successResponse';
import { AddItemBodyDto } from '../../storage/src/dto/create/add.item.dto';
import { AuthInfo } from '../../orders/decorators/user.decorator';

@Controller()
export class GatewayController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('STORAGE_SERVICE') private readonly storageClient: ClientProxy,
    @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
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

  @Get('/storage/items')
  async storageItems() {
    try {
      const res = await this.storageClient.send('find', {}).toPromise();
      console.log(res);
      return toSuccess(res);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Post('/storage/items')
  async addStorageItems(@Body() body: AddItemBodyDto) {
    try {
      const res = await this.storageClient.send('add', body).toPromise();
      console.log(res);
      return toSuccess(res);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Post('/orders')
  async makeOrder(
    @Body() data: unknown,
    @AuthInfo() userInfo: { userId: string },
  ) {
    try {
      console.log(data);
      const res = await this.ordersClient
        .send('create', { data, userId: userInfo?.userId || '' })
        .toPromise();
      console.log(res);
      return toSuccess(res);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
