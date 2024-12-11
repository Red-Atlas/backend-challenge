import { DataSource } from "typeorm";

import { Property } from "../entities/Property.entity";
import { Advertisement } from "../entities/Advertisement.entity";
import { Transaction } from "../entities/Transaction.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "tomas123",
  database: "proveedores",
  entities: [Property, Advertisement, Transaction],
  synchronize: true,
  logging: true,
});

export default AppDataSource;
