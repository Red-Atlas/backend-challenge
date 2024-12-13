import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  Relation,
} from 'typeorm';
import { IUser, TUserRole, UserRole } from './user.dto.js';
import { hash } from 'argon2';
import { Transaction } from '../transaction/transaction.entity.js';
import { Property } from '../property/property.entity.js';

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Object.keys(UserRole), default: 'USER'})
  role: TUserRole;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Relation<Transaction[]>;

  @OneToMany(() => Property, (property) => property.owner)
  property: Relation<Property[]>;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  private previousPassword?: string;

  @BeforeUpdate()
  setPreviousPassword() {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password.length < 6) {
      throw new Error('Password must be at least 6 characters long')
    }
    if (!this.previousPassword || this.previousPassword !== this.password) {
      this.password = (await hash(this.password, {})).toString();
    }
  }
}