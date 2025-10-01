// data-source.ts
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import * as dotenv from 'dotenv';
import { Listing } from './marketplace/entities/listing.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Listing],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
});
