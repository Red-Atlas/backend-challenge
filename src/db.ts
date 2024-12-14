import { DataSource } from 'typeorm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'src/.env'})

// Define __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("__filename", __filename)
console.log("__dirname", __dirname)
console.log("hosttt",process.env.DB_HOST)
console.log("portsss", process.env.DB_PORT)
console.log("usernamee", process.env.DB_USERNAME)
console.log("passwordd", process.env.DB_PASSWORD)
console.log("database", process.env.DB_NAME)
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
  entities: [
    process.env.NODE_ENV === "production"
      ? "dist/components/**/**.entity.js"
      : join(__dirname + "/components/**/**.entity.{ts,js}"),
  ],
  migrations: [
    process.env.NODE_ENV === "production"
      ? "dist/migrations/*.js"
      : join(__dirname + "/migrations/*.{ts,js}"),
  ],
});