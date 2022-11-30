import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IProduct } from '../dtos/IProduct';
import { IShowProduct } from '../dtos/IShowProduct';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IShowProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}
