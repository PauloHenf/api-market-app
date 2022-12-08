import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ISendForgotPasswordEmailServiceRequest } from '../dtos/IUserToken';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({
    email,
  }: ISendForgotPasswordEmailServiceRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await this.userTokensRepository.generate(user.id);

    console.log(token);
  }
}
