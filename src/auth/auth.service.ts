import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { JwtPayload, LoginInput, LoginResultType, MeResultType } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUserByPassword(
    input: LoginInput,
  ): Promise<LoginResultType | null> {
    const user = await this.usersService.get({ email: input.email });
    if (!user) return null;

    const passwordIsValid = await compare(input.password, user.password);

    if (!passwordIsValid) return null;

    const { token } = this.createJwt(input);

    const result: LoginResultType = {
      email: input.email,
      token,
    };

    return result;
  }

  async validateJwtPayload(payload: JwtPayload): Promise<UserEntity | null> {
    const user = await this.usersService.get({ email: payload.email });
    return user ?? null;
  }

  createJwt(user: LoginInput): { data: JwtPayload; token: string } {
    const data: JwtPayload = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);
    return { data, token: jwt };
  }

  async register({
    email,
    password,
    firstName,
    lastName,
  }: CreateUserDto): Promise<LoginResultType> {
    const hashedPassword = await hash(password, 10);

    try {
      await this.usersService.create({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });
      const { token } = this.createJwt({ email, password });

      const result: LoginResultType = {
        email,
        token,
      };

      return result;
    } catch (error) {
      throw new BadRequestException('User with that email already exists');
    }
  }

  async getProfileInfoFromToken(token?: string): Promise<MeResultType | null> {
    if (!token) return null;

    const payload = this.jwtService.decode(
      token.replace('Bearer ', ''),
    ) as JwtPayload;

    if (!payload?.email) return null;
    const { email, firstName, lastName } = await this.usersService.get({
      email: payload.email,
    });

    return { email, firstName, lastName };
  }
}
