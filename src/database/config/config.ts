import { SequelizeOptions } from 'sequelize-typescript';
import { RefreshToken } from 'src/tokens/tokens.entity';
import { User } from 'src/users/users.entity';

export default module;

export const test = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [],
} as SequelizeOptions;

export const dev = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  models: [User, RefreshToken],
} as SequelizeOptions;
