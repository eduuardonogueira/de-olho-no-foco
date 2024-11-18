import { ReactNode, useEffect, useState } from "react";
import { AUTH_CONTEXT_INITIAL_STATE, AuthContext } from "./AuthContext";
import Cookies from "js-cookie";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = Cookies.get("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : {
          accessKey: AUTH_CONTEXT_INITIAL_STATE.accessKey,
          isLogged: AUTH_CONTEXT_INITIAL_STATE.isLogged,
        };
  });

  useEffect(() => {
    Cookies.set("auth", JSON.stringify(auth), { expires: 1 });
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        accessKey: auth.accessKey,
        setAuth: setAuth,
        isLogged: auth.isLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
