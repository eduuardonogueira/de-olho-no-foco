import { notification } from "antd";
import { CSSProperties, useState } from "react";

interface INotificationProps {
  message: string;
  description: string;
  isOpen: boolean;
  className?: string;
  setIsOpen: (isOpen: boolean) => void;
  duration?: number | null | undefined
  style?: CSSProperties
}

export const Alert = ({
  message,
  description,
  isOpen,
  setIsOpen,
  className,
  duration,
  style
}: INotificationProps) => {
  const [api, contextHolder] = notification.useNotification();

  const [isRenderized, setIsRenderized] = useState(false);

  if (!isOpen && isRenderized) {
    setIsRenderized(false);
  }

  if (isOpen && !isRenderized) {
    api.open({
      style,
      message,
      description,
      showProgress: true,
      pauseOnHover: false,
      duration,
      className,
      
      onClose: () => setIsOpen(false),
    });
    setIsRenderized(true);
  }

  return <>{contextHolder}</>;
};
