import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import UpdateUserService from '../services/UpdateUserService';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const user = await listUsers.execute();

    return res.json(user);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { firstname, lastname, email, password, cpf, telephone, birthdate } =
      req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      firstname,
      lastname,
      email,
      password,
      cpf,
      telephone,
      birthdate,
    });

    return res.json(user);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { firstname, lastname, email, password, telephone, address, gender } =
      req.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id,
      firstname,
      lastname,
      email,
      password,
      telephone,
      address,
      gender,
    });

    return res.json(user);
  }
}

export default UserController;
