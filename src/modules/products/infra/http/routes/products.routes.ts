import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';
import uploadConfig from '@config/upload';
import multer from 'multer';
import { ProductImageController } from '../controllers/ProductImageController';
import { container } from 'tsyringe';
import { isAuthenticated } from '@modules/users/infra/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = container.resolve(ProductsController);
const productsImageController = container.resolve(ProductImageController);

const upload = multer(uploadConfig);

productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
      description: Joi.string().required(),
      discountPercentage: Joi.number().precision(3),
    },
  }),
  isAuthenticated,
  productsController.create,
);

productsRouter.patch(
  '/image/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  upload.single('image'),
  productsImageController.update,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
      description: Joi.string().required(),
      discountPercentage: Joi.number().precision(3),
    },
  }),
  isAuthenticated,
  productsController.update,
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  productsController.delete,
);

export default productsRouter;
