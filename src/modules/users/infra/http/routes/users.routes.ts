import { Router } from 'express';
import { container } from 'tsyringe';
import { User } from '../../typeorm/entities/User';
import { UserController } from '../controllers/UserController';

const usersRouter = Router();
const usersController = container.resolve(UserController);

usersRouter.get('/', usersController.index);

usersRouter.post('/', usersController.create);

usersRouter.put('/:id', usersController.update);

export default usersRouter;
