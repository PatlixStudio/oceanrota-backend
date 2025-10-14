// data-source.ts
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import * as dotenv from 'dotenv';
import { Listing } from './marketplace/entities/listing.entity';
import { MarineService } from './marine-services/entities/service.entity';
import { Engine } from './marketplace/entities/engine.entity';
import { Vessel } from './marketplace/entities/vessel.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Listing, Vessel, Engine, MarineService],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
});
