import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { container } from 'tsyringe';
import { SessionsController } from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = container.resolve(SessionsController);

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
