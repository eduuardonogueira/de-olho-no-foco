// AlertProvider.tsx
import { ReactNode, useEffect, useState } from "react";
import {
  AlertContext,
  ALERT_CONTEXT_INITIAL_VALUES,
  IAlertValues,
} from "./AlertContext";

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<IAlertValues>(
    ALERT_CONTEXT_INITIAL_VALUES
  );

  useEffect(() => {
    if (alert.isOpen) {
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, isOpen: false }));
      }, 5000);
    }
  }, [alert]);

  return (
    <AlertContext.Provider value={{ ...alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
