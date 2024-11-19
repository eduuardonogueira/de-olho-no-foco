import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsTypeService } from './notificationsType.service';
import { UserNotificationsService } from './userNotifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    PrismaService,
    NotificationsTypeService,
    UserNotificationsService,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
