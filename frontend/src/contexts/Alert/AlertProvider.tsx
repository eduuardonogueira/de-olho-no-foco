// AlertProvider.tsx
import { ReactNode, useState } from "react";
import { AlertContext, ALERT_CONTEXT_INITIAL_VALUES, IAlertValues } from "./AlertContext";

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<IAlertValues>(ALERT_CONTEXT_INITIAL_VALUES);

  return (
    <AlertContext.Provider value={{ ...alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
