import { IAddress } from './IAddress';

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cpf: string;
  address: IAddress;
  telephone: string;
  birthdate: string;
  gender: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}
