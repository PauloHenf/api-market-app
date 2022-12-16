import { IUser } from '@modules/users/dtos/IUser';
import { IOrdersPurchasesHistory } from './IOrdersPurchasesHistory';

export interface IOrderRepositoryCreateOrder {
  user: IUser;
  products: IOrdersPurchasesHistory[];
}
