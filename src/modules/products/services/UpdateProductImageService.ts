import { AppError } from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import { inject, injectable } from 'tsyringe';
import { IUpdateImageProduct } from '../dtos/IUpdateProductImage';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export class UpdateProductImageService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    productId,
    imageFileName,
  }: IUpdateImageProduct): Promise<void> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new AppError('User not found.');
    }

    if (product.image) {
      const productImageFilePath = path.join(
        uploadConfig.directory,
        product.image,
      );
      const productImageFileExist = await fs.promises.stat(
        productImageFilePath,
      );

      if (productImageFileExist) {
        await fs.promises.unlink(productImageFilePath);
      }
    }

    product.image = imageFileName;

    await this.productsRepository.save(product);
  }
}
