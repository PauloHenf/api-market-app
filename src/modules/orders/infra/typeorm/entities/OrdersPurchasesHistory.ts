import { IOrdersPurchasesHistory } from '@modules/orders/dtos/IOrdersPurchasesHistory';
import { IOrdersPurchasesHistoryStatus } from '@modules/orders/dtos/IOrdersPurchasesHistoryStatus';
import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IAddress } from '@modules/users/dtos/IAddress';
import { json } from 'stream/consumers';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './Order';

@Entity('orders_purchases_history')
export class OrdersPurchasesHistory implements IOrdersPurchasesHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_purchase)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, product => product.order_purchase)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @Column()
  purchase_id: Date;

  @Column({ type: 'json' })
  status: IOrdersPurchasesHistoryStatus;

  @Column()
  payment_form: string;

  @Column({ type: 'json' })
  address: IAddress;

  @Column()
  name_product: string;

  @Column('decimal')
  price: number;

  @Column()
  image: string;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
