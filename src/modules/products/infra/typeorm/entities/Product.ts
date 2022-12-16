import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IProduct } from '@modules/products/dtos/IProduct';
import { OrdersPurchasesHistory } from '@modules/orders/infra/typeorm/entities/OrdersPurchasesHistory';

@Entity('products')
export class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => OrdersPurchasesHistory,
    order_purchase => order_purchase.product,
  )
  order_purchase: OrdersPurchasesHistory[];

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column('decimal')
  discountPercentage: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
