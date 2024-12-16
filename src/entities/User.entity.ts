import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from "typeorm";

import { Auth } from "./Auth.entity";
import { Property } from "./Property.entity";
import { Transaction } from "./Transaction.entity";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}

export { User };
