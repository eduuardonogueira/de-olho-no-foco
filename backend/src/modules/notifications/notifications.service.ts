import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationsDto } from './dtos/create-notifications.dto';
import { NotificationParamsDto } from './dtos/notification-params.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string, req?: any) {
    const userId = req.user.id;

    const findNotification =
      await this.prismaService.globalNotification.findUnique({
        where: { id },
        include: { userStatus: { where: { userId } }, type: true },
      });

    if (!findNotification) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }

    return findNotification;
  }

  async findMany(params: NotificationParamsDto, req: any) {
    const userId = req.user.id;
    const { isRead, isDeleted, type, expiresAt } = params;

    const findAllNotification =
      await this.prismaService.globalNotification.findMany({
        where: {
          type: { name: type },
          expiresAt,
          userStatus: { some: { userId, isRead, isDeleted } },
        },
        include: {
          userStatus: true,
          type: true,
        },
      });

    const total = await this.prismaService.globalNotification.count({
      where: {
        type: { name: type },
        expiresAt,
        userStatus: { some: { userId, isRead, isDeleted } },
      },
    });

    if (!findAllNotification) {
      throw new HttpException('Notifications not found', HttpStatus.NOT_FOUND);
    }

    return {
      notifications: findAllNotification,
      total: total,
    };
  }

  async getAll(req: any) {
    const userId = req.user.id;

    const findAllNotification =
      await this.prismaService.globalNotification.findMany({
        include: { userStatus: { where: { userId } }, type: true },
      });

    if (!findAllNotification) {
      throw new HttpException('Notifications not found', HttpStatus.NOT_FOUND);
    }

    return findAllNotification;
  }

  async create(notificationPayload: CreateNotificationsDto) {
    const notification = await this.prismaService.globalNotification.create({
      data: notificationPayload,
    });

    const users = await this.prismaService.user.findMany({
      select: { id: true },
    });

    if (users.length === 0) {
      throw new HttpException('No users found to notify', HttpStatus.NOT_FOUND);
    }

    const userNotificationStatus = users.map((user) => ({
      userId: user.id,
      notificationId: notification.id,
    }));

    await this.prismaService.$transaction([
      this.prismaService.userNotificationStatus.createMany({
        data: userNotificationStatus,
      }),
    ]);

    return notification;
  }

  async update() {}

  async delete(id: string) {
    const findNotification = await this.findOne(id);

    if (!findNotification) throw new NotFoundException();

    const point = await this.prismaService.globalNotification.delete({
      where: { id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Point sucessfully deleted',
      data: point,
    };
  }
}
