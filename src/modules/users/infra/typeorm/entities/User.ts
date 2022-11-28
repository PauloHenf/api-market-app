import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAddress } from '@modules/users/dtos/IAddress';
import { IUser } from '@modules/users/dtos/IUser';
import { IUserGender } from '@modules/users/dtos/IUserGender';

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column({
    type: 'json',
  })
  address: IAddress;

  @Column()
  telephone: string;

  @Column()
  birthdate: string;

  @Column({
    type: 'enum',
    enum: IUserGender,
    default: IUserGender.Undefined,
  })
  gender: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
