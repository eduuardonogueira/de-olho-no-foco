import { useContext, useEffect, useRef } from "react";
import { notification } from "antd";
import { AlertContext } from "@contexts/Alert/AlertContext";

export const Alert = () => {
  const { message, description, isOpen, className, duration, style } =
    useContext(AlertContext);
  const [api, contextHolder] = notification.useNotification();

  const wasOpen = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      api.open({
        key: "global-alert",
        style,
        message,
        description,
        className,
        duration,
        showProgress: true,
        pauseOnHover: false,
        onClose: () => {
          wasOpen.current = false;
        },
      });
      wasOpen.current = true;
    }

    if (!isOpen && wasOpen.current) {
      api.destroy("global-alert");
      wasOpen.current = false;
    }
  }, [isOpen, message, description, className, duration, style, api]);

  return <>{contextHolder}</>;
};
