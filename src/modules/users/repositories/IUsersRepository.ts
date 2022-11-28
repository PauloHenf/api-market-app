import { ICreateUser } from '../dtos/ICreateUser';
import { IUser } from '../dtos/IUser';

export interface IUsersRepository {
  findAll(): Promise<IUser[] | undefined>;
  findByName(firstname: string, lastname: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findByCpf(cpf: string): Promise<IUser | undefined>;
  findByTelephone(telephone: string): Promise<IUser | undefined>;

  create(user: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
