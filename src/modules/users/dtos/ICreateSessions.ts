import { IUser } from './IUser';

export interface ICreateSessions {
  email: string;
  password: string;
}

export interface ITokenResponse {
  user: IUser;
  token: string;
}
