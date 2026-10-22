// src/database/data-source.ts
import { DataSource } from 'typeorm';
import { envs } from '../config/envs';
import { join } from 'path'; //Nueva importación para usar join

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')], // 'src/**/*.entity{.ts,.js}'
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')], //'src/database/migrations/*{.ts,.js}'
  synchronize: false,
});
