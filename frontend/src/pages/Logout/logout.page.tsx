import { LOGIN_ROUTE } from "@constants/routes";
import { useContext, useEffect } from "react";
import { AUTH_CONTEXT_INITIAL_STATE, AuthContext } from "@contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "@components/index";

export const Logout = () => {
  const { setAuth } = useContext(AuthContext);
  const navigator = useNavigate();

  useEffect(() => {
    setAuth(AUTH_CONTEXT_INITIAL_STATE);
    setTimeout(() => {
      navigator(LOGIN_ROUTE);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader text="Até breve!" />;
};
