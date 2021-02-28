import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmService } from './config/typeorm';
import { GqlService } from './config/graphql';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlService,
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [TypeOrmService, GqlService],
})
export class AppModule {}
