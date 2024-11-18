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
    const { username, password } = authpayload;
    const findUser = await this.usersService.findOne({ email: username });

    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (password === findUser.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
