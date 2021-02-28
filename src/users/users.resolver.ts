import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UserType } from './types';
import { UsersService } from './users.service';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserType])
  @UseGuards(GqlAuthGuard)
  async users(): Promise<UserType[]> {
    return await this.usersService.getAll();
  }

  @Query(() => UserType)
  async user(
    @Args({ name: 'email', type: () => String }) email: string,
  ): Promise<UserType> {
    return await this.usersService.get({ email });
  }
}
