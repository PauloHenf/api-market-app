import { ICreateProduct } from '../dtos/ICreateProduct';
import { IProduct } from '../dtos/IProduct';

export interface IProductsRepository {
  findAll(): Promise<IProduct[] | undefined>;
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;

  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
}
