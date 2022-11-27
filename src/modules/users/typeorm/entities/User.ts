import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserGender {
  Male = 'male',
  Female = 'female',
  Undefined = 'undefined',
}
interface Address {
  cep: string;
  identification: string;
  street: string;
  number: number;
  complement: string;
  reference: string;
  city: string;
  district: string;
  state: string;
}

@Entity('users')
class User {
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
  address: Address;

  @Column()
  telephone: string;

  @Column()
  birthdate: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.Undefined,
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
