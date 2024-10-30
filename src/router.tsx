import { LOGIN_ROUTE, MAP_ROUTE, SIGNUP_ROUTE } from "@constants/routes";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

export const RouterAllRoutes = () => {
  const Map = lazy(() => import("@pages/Home/home.page"));
  const Login = lazy(() => import("@pages/Login/login.page"));

  return (
    <main>
      <Suspense>
        <Routes>
          <Route element={<Login />} path={LOGIN_ROUTE} />
          {/* <Route element={<Register />} path={SIGNUP_ROUTE} /> */}
          <Route element={<Map />} path={MAP_ROUTE} />
        </Routes>
      </Suspense>
    </main>
  );
};
