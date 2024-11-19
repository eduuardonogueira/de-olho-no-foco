import { UserEntity } from 'src/users/entities/user.entity';
import { NotificationEntity } from './notification.entity';

export class UserNotificationStatusEntity {
  id: string;
  isRead: boolean;
  isDeleted: boolean;
  userId: string;
  notificationId: string;
  notification: NotificationEntity;
  user: UserEntity;
}
