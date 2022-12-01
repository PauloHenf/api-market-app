import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductService } from '@modules/products/services/CreateProductService';
import { DeleteProductService } from '@modules/products/services/DeleteProductService';
import { ListProductService } from '@modules/products/services/ListProductService';
import { ShowProductService } from '@modules/products/services/ShowProductService';
import { UpdateProductService } from '@modules/products/services/UpdateProductService';

export class ProductsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);

    const product = await listProducts.execute();

    return res.json(product);
  }
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.execute({ id });

    return res.json(product);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity, description, discountPercentage } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      quantity,
      description,
      discountPercentage,
    });

    return res.json(product);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, price, quantity, description, discountPercentage } = req.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
      description,
      discountPercentage,
    });

    return res.json(product);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id });

    return res.json([]);
  }
}
