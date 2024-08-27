import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentEntity } from './payments.entities';
import { AnimalsEntity } from './animals.entities';
import { UserEntity } from './user.entities';

@Entity()
export class TransportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  schedule: Date;

  @OneToMany(() => AnimalsEntity, (pet) => pet.id)
  pets: AnimalsEntity[];

  @ManyToOne(() => UserEntity, (user) => user.transports)
  user: UserEntity;

  @OneToOne(() => PaymentEntity, (payment) => payment.transport)
  payment: PaymentEntity;
}
