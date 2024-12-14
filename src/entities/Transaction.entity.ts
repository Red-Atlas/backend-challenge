import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from "typeorm";

import { Property } from "./Property.entity";

import { Type } from "../schemas/transaction.enum";

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
}

export { Transaction };
