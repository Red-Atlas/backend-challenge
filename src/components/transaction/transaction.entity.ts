import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Relation,
  Index,
} from 'typeorm';
import {
  ITransaction,
  PaymentMethodEnum,
  TPaymentMethodType,
  TransactionStatusEnum,
  TransactionTypeEnum,
  TTransactionStatusType,
  TTransactionType
} from './transaction.dto';
import { User } from '../user/user.entity';
import { Advertisement } from '../advertisement/advertisement.entity';
import { Property } from '../property/property.entity';

@Entity()
export class Transaction extends BaseEntity implements ITransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'enum', enum: Object.keys(TransactionTypeEnum), nullable: false })
  type: TTransactionType;

  @Column({ type: 'decimal', nullable: false })
  @Index()
  price: number;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @ManyToOne(() => Advertisement, (advertisement) => advertisement.transactions)
  @JoinColumn({ name: 'advertisement_id' })
  advertisement: Relation<Advertisement>;

  @Column({ type: 'enum', enum: Object.keys(PaymentMethodEnum), nullable: false })
  paymentMethod: TPaymentMethodType;

  @Column({ type: 'varchar' })
  notes: string;

  @Column({ type: 'decimal' })
  taxAmount: number;

  @Column({ type: 'enum', enum: Object.keys(TransactionStatusEnum), default: 'IN_VERIFICATION' })
  status: TTransactionStatusType;

  @ManyToOne(() => Property, (property) => property.transactions)
  @JoinColumn({ name: 'property_id' })
  property: Relation<Property>;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}