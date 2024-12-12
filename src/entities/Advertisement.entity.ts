import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Index,
} from "typeorm";

import { Property } from "./Property.entity";
import { Transaction } from "./Transaction.entity";

enum PropertyType {
  APARTMENT = "apartment",
  HOUSE = "house",
  RETAIL = "retail",
  LAND = "land",
  INDUSTRIAL = "industrial",
}

enum Status {
  FOR_SALE = "for_sale",
  FOR_LEASE = "for_lease",
}

@Entity()
class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  @Index()
  price: number;

  @Column({ type: "enum", enum: Status })
  status: string;

  @Column({ type: "enum", enum: PropertyType })
  propertyType: string;

  @OneToMany(() => Transaction, (transaction) => transaction.advertisement)
  transactions: Transaction[];

  @ManyToOne(() => Property, (property) => property.advertisements)
  property: Property;
}

export { Advertisement };
