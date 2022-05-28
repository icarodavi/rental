import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Category } from '../modules/cars/entities/Category';
import { Specification } from '../modules/cars/entities/Specification';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'database_ignite',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentx',
  synchronize: true,
  logging: true,
  entities: [Category, Specification],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
});
//
export default AppDataSource;
