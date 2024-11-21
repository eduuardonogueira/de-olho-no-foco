import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ImgurService } from 'src/providers/imgur.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly imgurService: ImgurService,
  ) {}

  async findOne({ id, email }: { id?: string; email?: string }) {
    const findUser = await this.prismaService.user.findUnique({
      where: { id, email },
    });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return findUser;
  }

  async getAll(req: any) {
    const { role } = req.user;

    if (role !== 'admin') {
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    }

    const findAllUsers = await this.prismaService.user.findMany();

    if (!findAllUsers) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }

    return findAllUsers;
  }

  async create(userPayload: CreateUserDto, currentUser?: any) {
    const { email, role } = userPayload;

    console.log(currentUser);

    if (role !== 'adventure') {
      if (!currentUser || currentUser?.role !== 'admin') {
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
      const { password, profileImage, ...newUpdateUser } = userPayload;

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      const newUser = {
        password: hash,
        ...newUpdateUser,
      };

      if (profileImage) {
        const imageUrl = await this.imgurService.sendImage(profileImage);
        newUpdateUser[profileImage] = imageUrl;
      }

      const createdUser = await this.prismaService.user.create({
        data: newUser,
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

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.prismaService.user.delete({ where: { id } });
  }

  async update(updateUserPayload: UpdateUserDto, req: any) {
    const { role } = req.user;
    const { id } = updateUserPayload;

    const findUser = await this.findOne({ id });

    if (findUser) {
      if (role !== 'admin' && id !== findUser.id) {
        throw new HttpException(
          'Operation not allowed',
          HttpStatus.METHOD_NOT_ALLOWED,
        );
      }

      const { profileImage, password, ...newUpdateUser } = updateUserPayload;

      if (profileImage) {
        const imageUrl = await this.imgurService.sendImage(profileImage);
        newUpdateUser[profileImage] = imageUrl;
      }

      if (password) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        newUpdateUser['password'] = hash;
      }

      const updatedUser = await this.prismaService.user.update({
        where: { id: findUser.id },
        data: newUpdateUser,
      });

      return updatedUser;
    }
  }
}
