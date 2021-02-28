import { Injectable } from '@nestjs/common';
import { User } from 'src/entity';

@Injectable()
export class UsersService {
  async create(createUserDto: { email: string }): Promise<User> {
    return { id: 1, email: createUserDto.email };
  }

  async getAll(): Promise<User[]> {
    return [];
  }
}
