import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from 'src/entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation((returns) => User)
  async createUser(
    @Args({ name: 'email', type: () => String }) email: string,
  ): Promise<User> {
    return await this.usersService.create({ email });
  }

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return await this.usersService.getAll();
  }
}
