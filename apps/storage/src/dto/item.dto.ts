import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Item } from '../entities/item.entity';

export class ItemDto implements Item {
  @ApiProperty({ description: 'The unique identifier of the item.' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The name of the item.' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the item.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'The quantity of the item.' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'The price of the item.' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'The date and time when the item was created.' })
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the item was last updated.',
  })
  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;
}
