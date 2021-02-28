import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from 'src/enviroments';

export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions() {
    const options: TypeOrmModuleOptions = {
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      entities: [],
      synchronize: true,
    };
    return options;
  }
}
