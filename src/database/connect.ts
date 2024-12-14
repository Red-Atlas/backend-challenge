import { DataSource } from "typeorm";

import { Property } from "../entities/Property.entity";
import { Advertisement } from "../entities/Advertisement.entity";
import { Transaction } from "../entities/Transaction.entity";
import { Auth } from "../entities/Auth.entity";
import { User } from "../entities/User.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Auth, Property, Advertisement, Transaction],
  // synchronize: true,
  migrations: ["src/migration/*.ts"],
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default AppDataSource;
