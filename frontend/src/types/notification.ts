// export interface INotification {
//   id: string;
//   title: string;
//   message: string;
//   expiresAt: Date | null;
//   createdAt: Date;
//   userStatus: [IUserStatus];
//   type: INotificationType;
// }

// export interface IUserStatus {
//   isRead: boolean;
//   isDeleted: boolean;
// }

export interface INotificationType {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGlobalNotification {
  id: string;
  title: string;
  message: string;
  typeId: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  type: INotificationType;
}

export interface IUserNotificationStatus {
  id: string;
  isRead: boolean;
  isDeleted: boolean;
  userId: string;
  notificationId: string;
  notification: IGlobalNotification;
}

export interface INotificationWithStatus extends IGlobalNotification {
  userStatus: IUserNotificationStatus;
}

