import { ItemDto } from '../../../../storage/src/dto/item.dto';

export class CreateOrderBodyDto {
  items: ItemDto[];
}
