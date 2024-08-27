import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entities';
import { TransportEntity } from './transport.entities';

@Entity()
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stripePaymentId: string;

  @Column()
  amount: number;

  @ManyToOne(() => UserEntity, (user) => user.payments)
  user: UserEntity;

  @OneToOne(() => TransportEntity, (transport) => transport.payment)
  transport: TransportEntity;
}
