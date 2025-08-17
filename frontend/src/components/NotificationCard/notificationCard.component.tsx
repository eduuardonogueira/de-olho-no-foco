import styles from "./notificationCard.module.scss";
import { INotificationWithStatus } from "@customtypes/notification";
import { Check, Clock, Trash } from "@phosphor-icons/react";
import { useDateFormatter } from "../../hooks/useDateFormatter";
import cn from "classnames";

interface INotificationCardProps {
  data: INotificationWithStatus;
}

export const NotificationCard = ({ data }: INotificationCardProps) => {
  const { formatTimeAgo } = useDateFormatter();

  // const isExpired = (expiresAt?: Date) => {
  //   if (!expiresAt) return false;
  //   return new Date() > expiresAt;
  // };

  return (
    <article
      className={cn(styles.notificationWrapper, {
        [styles.newNotification]: !data.userStatus.isRead,
      })}
    >
      <img src={data.type.imageUrl} className={styles.image} />
      <div className={styles.title}>
        <h4>{data.title}</h4>
        <span>{data.userStatus.isRead ? "true" : "false"}</span>
      </div>
      <p className={styles.message}>{data.message}</p>
      <div className={styles.footer}>
        <div className={styles.date}>
          <Clock size={16} />
          <p>{formatTimeAgo(new Date(data.createdAt))}</p>
        </div>
        <span>{data.type.name}</span>
      </div>

      <div className={styles.actions}>
        <button className={cn(styles.actionButton, styles.readButton)}>
          <Check size={18}/>
        </button>
        <button className={cn(styles.actionButton, styles.deleteButton)}>
          <Trash size={18}/>
        </button>
      </div>
    </article>
  );
};

export default NotificationCard;

