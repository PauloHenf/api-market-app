import { IAddress } from './IAddress';

export interface IUpdateUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  telephone: string;
  address: IAddress;
  gender: string;
}
