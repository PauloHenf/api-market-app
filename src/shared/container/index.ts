import { container } from 'tsyringe';

import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IProductsRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UsersRepository,
);
