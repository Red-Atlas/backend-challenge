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
import { User } from '../user/user.entity.js';
import { Advertisement } from '../advertisement/advertisement.entity.js';
import { IProperty, PropertySectorEnum, TPropertySectorEnum } from './property.dto.js';
import { Transaction } from '../transaction/transaction.entity.js';

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

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}