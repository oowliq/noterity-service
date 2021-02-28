import { UserModel } from 'src/models/user.model';

export class CreateUserDto implements Pick<UserModel, 'email' | 'password'> {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
