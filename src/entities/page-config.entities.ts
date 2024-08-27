import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EnterpriseEntity } from './enterprise.entities';

@Entity()
export class PageConfigEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  whatsApp: string;

  @Column()
  instagram: string;

  @Column()
  facebook: string;

  @Column()
  donationLink: string;

  @Column()
  backgroundImage: string;

  @Column()
  aboutMe: string;

  @Column()
  avatarImage: string;

  @Column()
  colorInfo: string;

  @OneToOne(
    () => EnterpriseEntity,
    (enterprise: EnterpriseEntity) => enterprise.pageConfig,
  )
  @JoinColumn()
  public enterprise: EnterpriseEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
