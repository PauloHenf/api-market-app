import { IOrdersPurchasesHistory } from '@modules/orders/dtos/IOrdersPurchasesHistory';
import { IOrdersPurchasesHistoryStatus } from '@modules/orders/dtos/IOrdersPurchasesHistoryStatus';
import { IAddress } from '@modules/users/dtos/IAddress';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders_purchases_history')
export class OrdersPurchasesHistory implements IOrdersPurchasesHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  purchase_id: Date;

  @Column()
  status: IOrdersPurchasesHistoryStatus;

  @Column()
  payment_form: string;

  @Column()
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
