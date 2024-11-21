import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsTypeService } from './notificationsType.service';
import { CreateNotificationsTypeDto } from './dtos/create-notifications-type.dto';
import { NotificationTypeParamsDto } from './dtos/notification-type-params.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateNotificationsDto } from './dtos/create-notifications.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { NotificationParamsDto } from './dtos/notification-params.dto';
import { UserNotificationsStatusService } from './userNotificationsStatus.service';
import { UpdateUserNotificationsStatusDto } from './dtos/update-user-notification-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly notificationsTypeService: NotificationsTypeService,
    private readonly userNotificationsStatusService: UserNotificationsStatusService,
  ) {}

  @Get('/global/all')
  getAllNotification(@Req() req: Request) {
    return this.notificationsService.getAll(req);
  }

  @Get('/global/all/filter')
  getAllNotificationFiltered(
    @Query() notificationParams: NotificationParamsDto,
    @Req() req: Request,
  ) {
    return this.notificationsService.findMany(notificationParams, req);
  }

  @Get('/global/:id')
  getNotification(@Param('id') id: string, @Req() req: Request) {
    return this.notificationsService.findOne(id, req);
  }

  @UseGuards(AdminGuard)
  @Post('/global/create')
  createNotification(@Body() notificationPayload: CreateNotificationsDto) {
    return this.notificationsService.create(notificationPayload);
  }

  @UseGuards(AdminGuard)
  @Delete('/global/:id')
  removeNotification(@Param('id') id: string) {
    return this.notificationsService.delete(id);
  }

  @UseGuards(AdminGuard)
  @Post('/type/create')
  createNotificationType(
    @Body() notificationTypePayload: CreateNotificationsTypeDto,
  ) {
    return this.notificationsTypeService.create(notificationTypePayload);
  }

  @UseGuards(AdminGuard)
  @Get('/type/all')
  getAllNotificationType() {
    return this.notificationsTypeService.getAll();
  }

  @UseGuards(AdminGuard)
  @Get('/type')
  getNotificationType(
    @Query() notificationTypeParamsDto: NotificationTypeParamsDto,
  ) {
    const { id, name } = notificationTypeParamsDto;
    return this.notificationsTypeService.findOne({ id, name });
  }

  @Patch('/status')
  updateUserStatus(
    @Body()
    updateUserNotificationsStatusPayload: UpdateUserNotificationsStatusDto,
  ) {
    return this.userNotificationsStatusService.update(
      updateUserNotificationsStatusPayload,
    );
  }
}
