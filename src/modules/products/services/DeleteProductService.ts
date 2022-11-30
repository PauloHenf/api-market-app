import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IDeleteProduct } from '../dtos/IDeleteProduct';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await this.productsRepository.remove(product);
  }
}
