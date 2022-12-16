import { IOrders } from '@modules/orders/dtos/IOrders';
import { Product } from '@modules/products/infra/typeorm/entities/Product';
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

@Entity('orders')
export class Order implements IOrders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  //@ManyToOne(() => Product, product => )

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
