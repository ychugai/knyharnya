import { PickType } from '@nestjs/swagger';
import { ItemDto } from '../item.dto';

export class AddQuantityItemBodyDto extends PickType(ItemDto, [
  'id',
  'quantity',
] as const) {}
