import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { IUser, TUserRole, UserRole } from './user.dto.js';
import { hash } from 'argon2';

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Column({ type: String, nullable: false })
  firstName: string;

  @Column({ type: String, nullable: false })
  lastName: string;

  @Column({ type: String, unique: true })
  email: string;

  @Column({ type: String })
  password: string;

  @Column({ type: 'enum', enum: Object.keys(UserRole), default: 'USER'})
  role: TUserRole;

  @Column({ type: Boolean, default: true })
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
    if (!this.previousPassword || this.previousPassword !== this.password) {
      this.password = (await hash(this.password, {})).toString();
    }
  }
}