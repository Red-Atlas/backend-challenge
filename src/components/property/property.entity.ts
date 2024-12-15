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
  Index,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Advertisement } from '../advertisement/advertisement.entity';
import { IGeoLocation, IProperty, PropertySectorEnum, TPropertySectorEnum } from './property.dto';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class Property extends BaseEntity implements IProperty {
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'enum', enum: Object.keys(PropertySectorEnum), nullable: false })
  @Index()
  sector: TPropertySectorEnum;

  @ManyToOne(() => User, (user) => user.property, { eager: false })
  @JoinColumn({ name: 'user_id' })
  owner: Relation<User>;

  @OneToMany(() => Advertisement, (advertisement) => advertisement.property)
  advertisement: Relation<Advertisement[]>;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'decimal' })
  @Index()
  area: number;

  @Column({ type: 'integer' })
  yearBuilt: number;

  @Column({ type: 'varchar', nullable: true })
  amenities: string;

  @Column({ type: 'varchar', nullable: true })
  images: string[];

  @OneToMany(() => Transaction, (transaction) => transaction.property)
  transactions: Relation<Transaction[]>;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  location: IGeoLocation;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}