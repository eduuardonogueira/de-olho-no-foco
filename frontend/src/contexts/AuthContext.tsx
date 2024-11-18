import { createContext } from "react";

interface IAuthContextState {
  accessKey: string;
  setAuth: ({
    accessKey,
    isLogged,
  }: {
    accessKey: string;
    isLogged: boolean;
  }) => void;
  isLogged: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AUTH_CONTEXT_INITIAL_STATE: IAuthContextState = {
  setAuth: () => {},
  isLogged: false,
  accessKey: "",
};

export const AuthContext = createContext(AUTH_CONTEXT_INITIAL_STATE);
