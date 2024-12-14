import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from "typeorm";

import { Advertisement } from "./Advertisement.entity";
import { Transaction } from "./Transaction.entity";

import { Sector } from "../schemas/property.enum";

@Entity()
class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  @Index()
  area: number;

  @Column()
  ownerName: string;

  @Column({ type: "enum", enum: Sector })
  sector: string;

  @Column({ type: "geometry", spatialFeatureType: "Point", srid: 4326 })
  coordinates: string;

  @OneToMany(() => Advertisement, (advertisement) => advertisement.property)
  advertisements: Advertisement[];

  @OneToMany(() => Advertisement, (transaction) => transaction.property)
  transactions: Transaction[];
}

export { Property };
