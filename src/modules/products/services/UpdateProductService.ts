import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IProduct } from '../dtos/IProduct';
import { IUpdateProduct } from '../dtos/IUpdateProduct';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
    description,
    image,
    discountPercentage,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name!!');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.description = description;
    product.image = image;
    product.discountPercentage = discountPercentage;

    await this.productsRepository.save(product);

    return product;
  }
}
