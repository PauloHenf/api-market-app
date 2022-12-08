import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { container } from 'tsyringe';
import { ForgotPasswordController } from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordController = container.resolve(ForgotPasswordController);

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

export default passwordRouter;
