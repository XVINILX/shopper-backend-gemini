import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnterpriseEntity } from './enterprise.entities';
import { AnimalsEntity } from './animals.entities';
import { PaymentEntity } from './payments.entities';
import { TransportEntity } from './transport.entities';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(
    () => EnterpriseEntity,
    (enterprise: EnterpriseEntity) => enterprise.user,
  )
  public enterprise: EnterpriseEntity;

  @OneToMany(() => AnimalsEntity, (animal: AnimalsEntity) => animal.receiver)
  public donations: AnimalsEntity[];

  @OneToMany(() => PaymentEntity, (payment: PaymentEntity) => payment.user)
  public payments: PaymentEntity[];

  @OneToMany(
    () => TransportEntity,
    (transport: TransportEntity) => transport.user,
  )
  public transports: TransportEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
