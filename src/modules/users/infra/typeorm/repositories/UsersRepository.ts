import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ICreateUser } from '@modules/users/dtos/ICreateUser';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    firstname,
    lastname,
    email,
    password,
    cpf,
    telephone,
    birthdate,
  }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      firstname,
      lastname,
      email,
      password,
      cpf,
      telephone,
      birthdate,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async findByName(
    firstname: string,
    lastname: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        firstname,
        lastname,
      },
    });

    return user;
  }

  public async findAll(): Promise<User[] | undefined> {
    const user = await this.ormRepository.find();

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        cpf,
      },
    });

    return user;
  }

  public async findByTelephone(telephone: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        telephone,
      },
    });

    return user;
  }
}
