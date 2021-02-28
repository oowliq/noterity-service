import { Req, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  GqlContextType,
} from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CreateUserInput, LoginInput } from './types';
import { LoginResultType, MeResultType } from './types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResultType)
  async loginUser(@Args('input') user: LoginInput): Promise<LoginResultType> {
    const result = await this.authService.validateUserByPassword(user);
    if (result) return result;
    throw new AuthenticationError(
      'Could not log-in with the provided credentials',
    );
  }

  @Mutation(() => LoginResultType)
  async createUser(
    @Args('input') user: CreateUserInput,
  ): Promise<LoginResultType> {
    return await this.authService.register(user);
  }

  @Query(() => MeResultType)
  @UseGuards(GqlAuthGuard)
  async me(@Context() context): Promise<MeResultType> {
    return await this.authService.getProfileInfoFromToken(
      context.req.headers.authorization,
    );
  }
}
