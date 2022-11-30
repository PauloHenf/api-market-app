import { inject, injectable } from 'tsyringe';
import { IUser } from '../dtos/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export class ListUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IUser[] | undefined> {
    const user = await this.usersRepository.findAll();

    return user;
  }
}
