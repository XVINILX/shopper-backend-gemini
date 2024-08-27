import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalsEntity } from './animals.entities';
import { UserEntity } from './user.entities';
import { PageConfigEntity } from './page-config.entities';

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

  @OneToOne(() => UserEntity, (user: UserEntity) => user.enterprise)
  @JoinColumn()
  public user: UserEntity;

  @OneToOne(
    () => PageConfigEntity,
    (pageConfig: PageConfigEntity) => pageConfig.enterprise,
  )
  public pageConfig: PageConfigEntity;

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
