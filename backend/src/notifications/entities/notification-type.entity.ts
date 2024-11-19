import { NotificationEntity } from './notification.entity';

export class NotificationTypeEntity {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  notification: NotificationEntity;
}
