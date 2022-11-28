import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { ICreateUser } from '../dtos/ICreateUser';
import { IUser } from '../dtos/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    firstname,
    lastname,
    email,
    password,
    cpf,
    telephone,
    birthdate,
  }: ICreateUser): Promise<IUser> {
    const cpfExists = await this.usersRepository.findByCpf(cpf);
    const emailExists = await this.usersRepository.findByEmail(email);
    const telephoneExists = await this.usersRepository.findByTelephone(
      telephone,
    );

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    if (cpfExists) {
      throw new AppError('CPF already used.');
    }

    if (telephoneExists) {
      throw new AppError('Telephone already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      cpf,
      telephone,
      birthdate,
    });

    return user;
  }
}
