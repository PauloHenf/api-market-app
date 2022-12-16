import { IOrder } from '../dtos/IOrder';
import { IOrderRepositoryCreateOrder } from '../dtos/IOrderRepositoryCreateOrder';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>;
  createOrder({ user, products }: IOrderRepositoryCreateOrder): Promise<IOrder>;
}
