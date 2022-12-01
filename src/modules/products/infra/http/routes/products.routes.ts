import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';
import uploadConfig from '@config/upload';
import multer from 'multer';
import { ProductImageController } from '../controllers/ProductImageController';
import { container } from 'tsyringe';

const upload = multer(uploadConfig);

const productsRouter = Router();
const productsController = container.resolve(ProductsController);
const productsImageController = container.resolve(ProductImageController);

productsRouter.get('/', productsController.index);

productsRouter.get('/:id', productsController.show);

productsRouter.post('/', upload.single('image'), productsController.create);

productsRouter.patch(
  '/image/:id',
  upload.single('avatar'),
  productsImageController.update,
);

productsRouter.put('/:id', productsController.update);

productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
