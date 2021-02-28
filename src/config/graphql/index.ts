import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GqlService implements GqlOptionsFactory {
  async createGqlOptions() {
    const gqlOptions: GqlModuleOptions = {
      playground: true,
      autoSchemaFile: true,
      sortSchema: true,
    };
    return gqlOptions;
  }
}
