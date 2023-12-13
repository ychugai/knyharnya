import { Column, Entity } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity('items')
export class Item extends CommonEntity {
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @Column({ name: 'quantity', type: 'int', nullable: false })
  quantity: number;

  @Column({ name: 'price', type: 'float', nullable: false })
  price: number;
}
