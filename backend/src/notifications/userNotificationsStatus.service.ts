import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserNotificationsStatusDto } from './dtos/update-user-notification-status.dto';

@Injectable()
export class UserNotificationsStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  async update(
    updateUserNotificationsStatusPayload: UpdateUserNotificationsStatusDto,
  ) {
    const { id, isDeleted, isRead } = updateUserNotificationsStatusPayload;

    const updatedUserStatus =
      await this.prismaService.userNotificationStatus.update({
        where: { id },
        data: { isDeleted, isRead },
      });

    if (!updatedUserStatus) throw new NotFoundException();

    return updatedUserStatus;
  }
}
