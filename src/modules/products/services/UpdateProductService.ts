import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  discountPercentage: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
    description,
    image,
    discountPercentage,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name!!');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.description = description;
    product.image = image;
    product.discountPercentage = discountPercentage;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
