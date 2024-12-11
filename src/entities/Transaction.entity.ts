import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Advertisement } from "./Advertisement.entity";

enum Type {
  SALE_PURCHASE = "sale_purchase",
  LEASE = "lease",
  MORTGAGE = "mortgage",
  JUDICIAL_SALE = "judicialSale",
  OTHER = "other",
}

@Entity()
class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({
    type: "decimal",
  })
  price: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "enum", enum: Type })
  type: string;

  @ManyToOne(() => Advertisement, (advertisement) => advertisement.transactions)
  advertisement: Transaction;
}

export { Transaction };
