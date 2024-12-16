import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from "typeorm";

import { Property } from "./Property.entity";

import { Type } from "../schemas/transaction.enum";
import { User } from "./User.entity";

@Entity()
class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({
    type: "decimal",
  })
  @Index()
  price: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "enum", enum: Type })
  type: string;

  @ManyToOne(() => Property, (property) => property.transactions)
  property: Property;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}

export { Transaction };
