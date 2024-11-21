export interface INotification {
  id: string;
  title: string;
  message: string;
  expiresAt: Date | null;
  createdAt: Date;
  userStatus: [IUserStatus];
  type: INotificationType;
}

export interface IUserStatus {
  isRead: boolean;
  isDeleted: boolean;
}

export interface INotificationType {
  name: string;
  imageUrl: string;
}
