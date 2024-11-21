import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authpayload: AuthPayloadDto) {
    console.log('validando o usuário');
    const { username, password } = authpayload;
    const findUser = await this.usersService.findOne({
      email: username.toLowerCase(),
    });

    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isMatch = await bcrypt.compare(password, findUser.password);

    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = findUser;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const key = process.env.JWT_SECRET;
    return this.jwtService.sign(user, { secret: key });
  }
}
