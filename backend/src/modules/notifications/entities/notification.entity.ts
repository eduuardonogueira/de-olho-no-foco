import { NotificationType } from '@prisma/client';
import { UserNotificationStatusEntity } from './user-notification-status.entity';

export class NotificationEntity {
  id: string;
  title: string;
  message: string;
  typeId: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  type: NotificationType;
  userStatus: UserNotificationStatusEntity[];
}
