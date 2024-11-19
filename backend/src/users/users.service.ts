import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne({ id, email }: { id?: string; email?: string }) {
    console.log(id, email);
    const findUser = await this.prismaService.user.findUnique({
      where: { id, email },
    });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return findUser;
  }

  async create(userPayload: CreateUserDto, currentUser?: any) {
    const { email, role } = userPayload;

    if (role != 'adventure') {
      if (!currentUser && currentUser?.role != 'admin') {
        throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
      }
    }

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException(
        'A user with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    try {
      const createdUser = await this.prismaService.user.create({
        data: userPayload,
      });

      if (!createdUser) {
        throw new HttpException(
          'Error creating user',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return createdUser;
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    const findUser = await this.findOne({ id });

    if (findUser) {
      return this.prismaService.user.delete({ where: { id } });
    }

    return null;
  }

  async getStatus(req: any) {
    const { user } = req;

    if (user) {
      console.log(user);
    }
  }
}
