import { container } from 'tsyringe';

import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';

container.registerSingleton<IProductsRepository>(
  'ProductRepository',
  ProductRepository,
);
