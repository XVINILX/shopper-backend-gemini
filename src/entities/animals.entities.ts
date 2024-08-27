import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnterpriseEntity } from './enterprise.entities';
import { UserEntity } from './user.entities';

@Entity()
export class AnimalsEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public race: string;

  @Column()
  public city: string;

  @Column()
  public state: string;

  @Column()
  public street: string;

  @Column()
  public zipCode: string;

  @ManyToOne(
    () => EnterpriseEntity,
    (company: EnterpriseEntity) => company.animals,
  )
  public company: EnterpriseEntity;

  @ManyToOne(() => UserEntity, (enterprise: UserEntity) => enterprise)
  public receiver: UserEntity;

  @Column()
  public donatedAt: Date;

  @Column()
  public status: string;

  @Column()
  public principalPictureUuid: string;

  @Column('simple-array')
  public listOfPictures: string[];

  @Column()
  public adoptedAt: Date;

  @Column()
  public birthday: Date;

  @Column({ type: Boolean, default: true })
  public activate: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
