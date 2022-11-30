import { ICreateProduct } from '@modules/products/dtos/ICreateProduct';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { getRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';

export class ProductRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
    description,
    image,
    discountPercentage,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
      description,
      image,
      discountPercentage,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async findAll(): Promise<Product[] | undefined> {
    const product = await this.ormRepository.find();

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return product;
  }
}
