import { IOrdersPurchasesHistoryStatus } from './IOrdersPurchasesHistoryStatus';
import { IAddress } from '@modules/users/dtos/IAddress';

export interface IOrdersPurchasesHistory {
  id: string;
  purchase_id: Date;
  status: IOrdersPurchasesHistoryStatus;
  payment_form: string;
  address: IAddress;
  name_product: string;
  price: number;
  image: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
