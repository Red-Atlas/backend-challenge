import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Relation,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Advertisement } from '../advertisement/advertisement.entity';
import { IProperty, PropertySectorEnum, TPropertySectorEnum } from './property.dto';

@Entity()
export class Property extends BaseEntity implements IProperty {
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'enum', enum: Object.keys(PropertySectorEnum), nullable: false })
  sector: TPropertySectorEnum;

  @ManyToOne(() => User, (user) => user.property, { eager: false })
  @JoinColumn({ name: 'user_id' })
  owner: Relation<User>;

  @OneToMany(() => Advertisement, (advertisement) => advertisement.property)
  advertisement: Relation<Advertisement[]>;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'decimal' })
  size: number;

  @Column({ type: 'integer' })
  yearBuilt: number;

  @Column({ type: 'varchar' })
  amenities: string;

  @Column({ type: 'varchar' })
  images: string[];

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}