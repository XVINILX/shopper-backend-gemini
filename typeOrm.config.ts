import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: ['dist/src/entities/**'],
  migrations: ['dist/type-orm/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
