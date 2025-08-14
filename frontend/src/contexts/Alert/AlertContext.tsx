import { createContext, CSSProperties } from "react";

export interface IAlertValues {
  message: string;
  description: string;
  isOpen: boolean;
  className?: string;
  duration?: number | null | undefined;
  style?: CSSProperties;
}

interface IAlertContextState extends IAlertValues {
  setAlert: (AlertProps: IAlertValues) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ALERT_CONTEXT_INITIAL_VALUES: IAlertValues = {
  message: "",
  description: "",
  isOpen: false,
};

export const AlertContext = createContext<IAlertContextState>({
  ...ALERT_CONTEXT_INITIAL_VALUES,
  setAlert: () => {},
});
