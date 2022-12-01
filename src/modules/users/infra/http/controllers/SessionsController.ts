import { CreateSessionsService } from '@modules/users/services/CreateSessionsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = container.resolve(CreateSessionsService);

    const user = await createSession.execute({
      email,
      password,
    });

    return res.json(user);
  }
}
