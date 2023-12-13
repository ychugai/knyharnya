import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Order } from '../entities/order.entity';

export class OrderDto implements Omit<Order, 'subOrders'> {
  @ApiProperty({ description: 'The unique identifier of the order.' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The total price of the order.' })
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ description: 'The user ID of the order.' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'The date and time when the order was created.' })
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the order was last updated.',
  })
  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;
}
