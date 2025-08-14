import { LOGIN_ROUTE } from "@constants/routes";
import { AuthContext } from "@contexts/Auth/AuthContext";
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

export const AuthRequired = ({ children }: { children: ReactNode }) => {
  const { accessKey } = useContext(AuthContext);

  if (!accessKey) return <Navigate replace to={LOGIN_ROUTE} />;

  return children;
};
