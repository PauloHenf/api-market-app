import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByName(
    firstname: string,
    lastname: string,
  ): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        firstname,
        lastname,
      },
    });

    return user;
  }
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        cpf,
      },
    });

    return user;
  }
  public async findByTelephone(telephone: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        telephone,
      },
    });

    return user;
  }
}

export default UsersRepository;
