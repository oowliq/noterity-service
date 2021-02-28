import * as dotenv from 'dotenv';

dotenv.config();

export const APP_PORT: number = process.env.APP_PORT
  ? Number(process.env.APP_PORT)
  : 3000;

export const DB_HOST: string = process.env.DB_HOST ?? 'localhost';

export const DB_PORT: number = process.env.DB_PORT
  ? Number(process.env.DB_PORT)
  : 5432;

export const DB_USER: string = process.env.DB_USER ?? 'root';

export const DB_PASSWORD: string = process.env.DB_PASSWORD ?? 'root';

export const DB_DATABASE: string = process.env.DB_DATABASE ?? 'database';
