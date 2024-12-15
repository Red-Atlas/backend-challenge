import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const configDb = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'username',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'red-atlas-db"',
  autoLoadEntities: true,
  dropSchema: true,
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export const confDbConfig = registerAs('database', () => configDb);

export const connectionSource = new DataSource(configDb as DataSourceOptions);
