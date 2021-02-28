import { Field, InputType, ObjectType } from '@nestjs/graphql';

export interface JwtPayload {
  email: string;
}
@InputType('LoginInput')
export class LoginInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}

@InputType('CreateUserInput')
export class CreateUserInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => String, { nullable: true })
  firstName: string;
  @Field(() => String, { nullable: true })
  lastName: string;
}

@ObjectType('Login')
export class LoginType {
  @Field(() => String)
  accessToken: string;
}

@ObjectType('LoginResult')
export class LoginResultType {
  @Field(() => String)
  token: string;
  @Field(() => String)
  email: string;
}

@ObjectType('MeResult')
export class MeResultType {
  @Field(() => String)
  email: string;
  @Field(() => String, { nullable: true })
  firstName: string;
  @Field(() => String, { nullable: true })
  lastName: string;
}
