import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Listing } from 'src/listings/entities/listing.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column('decimal', { precision: 10, scale: 2 })
  area: number;

  @Column()
  sector: string;

  @Column()
  owner_name: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Listing, (listing) => listing.property, {
    onDelete: 'CASCADE',
  })
  listings: Listing[];

  @OneToMany(() => Transaction, (transaction) => transaction.property, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];
}
