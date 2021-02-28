import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmService } from './config/typeorm';
import { GqlService } from './config/graphql';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlService,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmService, GqlService],
})
export class AppModule {}
