import { UpdateProductImageService } from '@modules/products/services/UpdateProductImageService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ProductImageController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateImage = container.resolve(UpdateProductImageService);
    const { id } = req.params;

    const product = updateImage.execute({
      productId: id,
      imageFileName: req.file.filename,
    });

    return res.json(product);
  }
}
