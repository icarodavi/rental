import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'admin',
  database: 'rentx',
  synchronize: true,
  logging: true,
  migrations: [`${__dirname}/database/migrations/*{.ts,.js}`],
});
