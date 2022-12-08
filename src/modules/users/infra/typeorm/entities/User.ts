import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAddress } from '@modules/users/dtos/IAddress';
//import { IUserGender } from '@modules/users/dtos/IUserGender';
import { IUser } from '@modules/users/dtos/IUser';

export enum IUserGender {
  Male = 'male',
  Female = 'female',
  Undefined = 'undefined',
}

@Entity('users')
export class User implements IUser {
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
