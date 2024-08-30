import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { MeasurementEntity } from './measurement.entities';

@Entity()
export class StorageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(
    () => MeasurementEntity,
    (measurement: MeasurementEntity) => measurement.storage,
  )
  @JoinColumn()
  public measurement: MeasurementEntity;

  @Column()
  image_url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
