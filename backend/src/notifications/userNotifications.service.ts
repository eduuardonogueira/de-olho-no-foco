import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserNotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne() {}
  async getAll() {}
  async create() {}
  async update() {}
  async delete() {}
}
