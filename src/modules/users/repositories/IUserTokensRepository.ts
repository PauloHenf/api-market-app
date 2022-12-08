import { IUserToken } from '../dtos/IUserToken';

export interface IUserTokensRepository {
  findByToken(id: string): Promise<IUserToken | undefined>;
  generate(user_id: string): Promise<IUserToken>;
}
