import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StorageEntity } from './storage.entities';
import { MeasurementType } from './enums/measurement.enum';
import { UserEntity } from './user.entities';

@Entity()
export class MeasurementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: MeasurementType,
  })
  measure_type: MeasurementType;

  @Column()
  measure_datetime: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.measurements, {
    nullable: false,
  })
  user: UserEntity;

  @OneToOne(
    () => StorageEntity,
    (storage: StorageEntity) => storage.measurement,
  )
  public storage: StorageEntity;

  @Column({ type: 'boolean', default: false })
  confirmed: boolean;

  @Column({ type: 'int' })
  monthMeasurement: number;

  @Column({ type: 'int' })
  yearMeasurement: number;

  @Column({ type: 'int' })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
