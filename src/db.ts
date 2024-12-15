import './config/env.js';
import { DataSource } from 'typeorm';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: process.env.NODE_ENV !== "production",
  ssl: {
    rejectUnauthorized: process.env.NODE_ENV == "production",
  },
  // migrationsRun: true,
  entities: ["dist/src/components/**/*.js", join(__dirname + "/components/**/*.entity.{j,t}s"),],
  migrations: ["dist/src/migrations/*.js", join(__dirname + "/migrations/*.{j,t}s")
  ],
});