import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  async create(entity: UserEntity): Promise<UserEntity> {
    return await this.usersRepository.save(entity);
  }

  async getAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async get(findUserDto: { email: string }): Promise<UserEntity> {
    return await this.usersRepository.findOne({ email: findUserDto.email });
  }
}
