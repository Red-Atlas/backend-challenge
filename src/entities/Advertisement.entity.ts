import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from "typeorm";

import { Property } from "./Property.entity";

import { PropertyType, Status } from "../schemas/advertisement.enum";

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
  @Index()
  status: string;

  @Column({ type: "enum", enum: PropertyType })
  @Index()
  propertyType: string;

  @ManyToOne(() => Property, (property) => property.advertisements)
  property: Property;
}

export { Advertisement };
