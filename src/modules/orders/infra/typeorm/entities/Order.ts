import { IOrders } from '@modules/orders/dtos/IOrders';
import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrdersPurchasesHistory } from './OrdersPurchasesHistory';

@Entity('orders')
export class Order implements IOrders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => OrdersPurchasesHistory,
    order_purchase => order_purchase.order,
    {
      cascade: true,
    },
  )
  order_purchase: OrdersPurchasesHistory[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
