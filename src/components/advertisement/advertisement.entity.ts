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
import {
  AdvertisementPropertyTypeEnum,
  AdvertisementStatusEnum,
  IAdvertisement,
  TAdvertisementPropertyTypeEnum,
  TAdvertisementStatusEnum
} from './advertisement.dto';
import { Transaction } from '../transaction/transaction.entity';
import { Property } from '../property/property.entity';

@Entity()
export class Advertisement extends BaseEntity implements IAdvertisement {
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Property, (property) => property.advertisement)
  @JoinColumn({ name: 'property_id' })
  property: Relation<Property>;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'enum', enum: Object.keys(AdvertisementPropertyTypeEnum), nullable: false })
  propertyType: TAdvertisementPropertyTypeEnum;

  @Column({ type: 'enum', enum: Object.keys(AdvertisementStatusEnum), nullable: false })
  status: TAdvertisementStatusEnum;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'date' })
  publishedDate: Date;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date;

  @Column({ type: 'varchar' })
  contactInfo: string;

  @Column({ type: 'boolean', default: false })
  negotiable: boolean;

  @Column({ type: 'integer' })
  viewsCount: number;

  @OneToMany(() => Transaction, (transaction) => transaction.advertisement)
  transactions: Relation<Transaction[]>;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}