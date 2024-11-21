import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsTypeService } from './notificationsType.service';
import { ImgurService } from 'src/providers/imgur.service';

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationsTypeService,
    PrismaService,
    ImgurService,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
