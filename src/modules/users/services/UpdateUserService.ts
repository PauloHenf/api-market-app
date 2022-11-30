import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUpdateUser } from '../dtos/IUpdateUser';
import { IUser } from '../dtos/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    firstname,
    lastname,
    email,
    password,
    telephone,
    address,
    gender,
  }: IUpdateUser): Promise<IUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists && email !== user.email) {
      throw new AppError('This email is already being used by another user.');
    }

    const telephoneExists = await this.usersRepository.findByTelephone(
      telephone,
    );

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

    user.address.cep = address.cep;
    user.address.identification = address.identification;
    user.address.street = address.street;
    user.address.number = address.number;
    user.address.complement = address.complement;
    user.address.reference = address.reference;
    user.address.city = address.city;
    user.address.district = address.district;
    user.address.state = address.state;

    await this.usersRepository.save(user);

    return user;
  }
}
