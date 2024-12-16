import "../utils/loadEnv.util";

import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/../entities/*.{j,t}s`],
  synchronize: false,
  migrations: [`${__dirname}/../migrations/*.{j,t}s`],
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default AppDataSource;
