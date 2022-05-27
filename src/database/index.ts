import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Category } from '../modules/cars/entities/Category';
import { Specification } from '../modules/cars/entities/Specification';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'database_ignite',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentx',
  synchronize: true,
  logging: true,
  entities: [Category],
  migrations: [`${__dirname}/database/migrations/*{.ts,.js}`],
});
//
