import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cpf: string;
  telephone: string;
  birthdate: string;
}

class CreateUserService {
  public async execute({
    firstname,
    lastname,
    email,
    password,
    cpf,
    telephone,
    birthdate,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const cpfExists = await usersRepository.findByCpf(cpf);
    const emailExists = await usersRepository.findByEmail(email);
    const telephoneExists = await usersRepository.findByTelephone(telephone);

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

    const user = usersRepository.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      cpf,
      telephone,
      birthdate,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
