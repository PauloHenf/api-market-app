import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/UserController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();
const usersController = container.resolve(UserController);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cpf: Joi.string().required(),
      telephone: Joi.string().required(),
      birthdate: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      telephone: Joi.string().required(),
      address: Joi.object(),
      gender: Joi.string(),
    },
  }),
  usersController.update,
);

export default usersRouter;
