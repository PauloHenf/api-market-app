import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import { ISendForgotPasswordEmailServiceRequest } from '../dtos/IUserToken';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';
import { EtherealMail } from '@config/mail/EtherealMail';

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

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
      },
      subject: '[Market Easy] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.firstname,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}
