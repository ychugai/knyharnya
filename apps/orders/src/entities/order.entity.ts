import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { SubOrder } from './subOrder.entity';

@Entity('orders')
export class Order extends CommonEntity {
  @Column({ name: 'totalPrice', type: 'float', nullable: false })
  totalPrice: number;

  @Column({ name: 'userId', type: 'uuid', nullable: false })
  userId: string;

  @OneToMany(() => SubOrder, (subOrder) => subOrder.order)
  subOrders: SubOrder[];
}
