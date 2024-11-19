import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationsTypeDto } from './dtos/create-notifications-type.dto';

@Injectable()
export class NotificationsTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne({ id, name }: { id?: string; name?: string }) {
    console.log(id, name);
    const findNotificationType =
      await this.prismaService.notificationType.findUnique({
        where: { id, name },
      });

    if (!findNotificationType) {
      throw new HttpException(
        'Notification type not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return findNotificationType;
  }

  async getAll() {}

  async create(notificationTypePayload: CreateNotificationsTypeDto) {
    const { image, name } = notificationTypePayload;
    const formData = new FormData();
    formData.append('image', image);

    const HttpConfig = {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID 5624532fa15df26',
      },
      body: formData,
    };

    const response = await fetch(
      'https://api.imgur.com/3/image/',
      HttpConfig,
    ).then((data) => data.json());

    if (response.status) {
      const notificationTypeData = {
        name,
        imageUrl: response.data.link,
      };

      try {
        const createdNotificationType =
          await this.prismaService.notificationType.create({
            data: notificationTypeData,
          });
        if (!createdNotificationType) {
          throw new HttpException(
            'Error creating user',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        return createdNotificationType;
      } catch (error) {
        throw new HttpException(
          error.toString(),
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        'Erro creating image url',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update() {}
  async delete(id: string) {}
}
