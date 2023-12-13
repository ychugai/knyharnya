import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Order } from './order.entity';

@Entity('sub_orders')
export class SubOrder extends CommonEntity {
  @Column({ name: 'itemId', type: 'uuid', nullable: false })
  itemId: string;

  @Column({ name: 'quantity', type: 'int', nullable: false })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.subOrders)
  order: Order;
}
