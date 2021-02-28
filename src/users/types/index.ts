import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/models/user.model';

@ObjectType('User')
export class UserType implements Omit<UserModel, 'password'> {
  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;
}
