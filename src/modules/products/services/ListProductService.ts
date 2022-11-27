import { inject, injectable } from 'tsyringe';
import { IProduct } from '../dtos/IProduct';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<IProduct[] | undefined> {
    const products = await this.productsRepository.findAll();

    return products;
  }
}

export default ListProductService;
