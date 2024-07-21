import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalsEntity } from './animals.entities';

@Entity()
export class EnterpriseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  razaoSocial: string;

  @Column()
  nomeFantasia: string;

  @Column()
  cnpj: string;

  @Column()
  regional: string;

  @OneToMany(() => AnimalsEntity, (animal: AnimalsEntity) => animal.company)
  @JoinColumn()
  public animals: AnimalsEntity[];

  @Column()
  openingDate: Date;

  @Column({ type: Boolean, default: true })
  activate: boolean;

  @Column({ type: String, array: true })
  especialidades: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
