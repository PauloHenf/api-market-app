import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface Address {
  cep: string;
  identification: string;
  street: string;
  number: number;
  complement: string;
  reference: string;
  city: string;
  district: string;
  state: string;
}

interface IRequest {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  telephone: string;
  address: Address;
  gender: string;
}

class UpdateUserService {
  public async execute({
    id,
    firstname,
    lastname,
    email,
    password,
    telephone,
    address,
    gender,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists && email !== user.email) {
      throw new AppError('This email is already being used by another user.');
    }

    const telephoneExists = await usersRepository.findByTelephone(telephone);

    if (telephoneExists && telephone !== user.telephone) {
      throw new AppError(
        'This telephone is already being used by another user.',
      );
    }

    const hashedPassword = await hash(password, 8);

    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = hashedPassword;
    user.telephone = telephone;
    user.gender = gender;

    await usersRepository.create({
      address,
    });

    user.address.cep = address.cep;
    user.address.identification = address.identification;
    user.address.street = address.street;
    user.address.number = address.number;
    user.address.complement = address.complement;
    user.address.reference = address.reference;
    user.address.city = address.city;
    user.address.district = address.district;
    user.address.state = address.state;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
