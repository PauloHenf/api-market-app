import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const usersRouter = Router();
const usersController = new UserController();

usersRouter.get('/', usersController.index);

usersRouter.post('/', usersController.create);

usersRouter.put('/:id', usersController.update);

export default usersRouter;
