import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICreateProduct } from '../dtos/ICreateProduct';
import { IProduct } from '../dtos/IProduct';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
    description,
    image,
    discountPercentage,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name!!');
    }

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
      description,
      image,
      discountPercentage,
    });

    return product;
  }
}
export default CreateProductService;
