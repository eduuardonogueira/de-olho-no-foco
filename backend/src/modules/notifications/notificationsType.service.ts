import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationsTypeDto } from './dtos/create-notifications-type.dto';
import { ImgurService } from '../../providers/imgur.service';

@Injectable()
export class NotificationsTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly imgurService: ImgurService,
  ) {}

  async findOne({ id, name }: { id?: string; name?: string }) {
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

  async getAll() {
    const findAllNotificationType =
      await this.prismaService.notificationType.findMany();

    if (!findAllNotificationType) {
      throw new HttpException(
        'Notifications type not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return findAllNotificationType;
  }

  async create(notificationTypePayload: CreateNotificationsTypeDto) {
    const { image, name } = notificationTypePayload;

    const imageUrl = await this.imgurService.sendImage(image);

    if (!imageUrl) {
      throw new HttpException(
        'Erro creating image url',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const notificationTypeData = {
      name,
      imageUrl,
    };

    try {
      const createdNotificationType =
        await this.prismaService.notificationType.create({
          data: notificationTypeData,
        });
      if (!createdNotificationType) {
        throw new HttpException(
          'Error creating type notification',
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
  }

  async update() {}

  async delete(id: string) {
    const findNotificationType = await this.findOne({ id });

    if (findNotificationType) {
      const notificationType = await this.prismaService.notificationType.delete(
        { where: { id } },
      );

      return notificationType;
    }
  }
}
