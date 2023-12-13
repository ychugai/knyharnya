import { PickType } from '@nestjs/swagger';
import { ItemDto } from '../item.dto';

export class AddItemBodyDto extends PickType(ItemDto, [
  'name',
  'description',
  'quantity',
] as const) {}
