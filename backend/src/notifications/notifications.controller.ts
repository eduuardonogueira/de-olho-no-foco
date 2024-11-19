import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsTypeService } from './notificationsType.service';
import { CreateNotificationsTypeDto } from './dtos/create-notifications-type.dto';
import { UserNotificationsService } from './userNotifications.service';
import { NotificationTypeParamsDto } from './dtos/notification-type-params.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly notificationsTypeService: NotificationsTypeService,
    private readonly userNotificationsService: UserNotificationsService,
  ) {}

  @Post('/global/create')
  createNotification() {
    return;
  }

  @Post('/type/create')
  createTypeNotification(
    @Body() notificationTypePayload: CreateNotificationsTypeDto,
  ) {
    return this.notificationsTypeService.create(notificationTypePayload);
  }

  @Get('/type')
  getNotificationType(
    @Query() notificationTypeParamsDto: NotificationTypeParamsDto,
  ) {
    const { id, name } = notificationTypeParamsDto;
    return this.notificationsTypeService.findOne({ id, name });
  }

  @Get('/')
  getNotification() {
    this.notificationsService.findOne();
  }
}
