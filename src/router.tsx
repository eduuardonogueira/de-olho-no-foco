import {
  AREAS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  NOTIFICATIONS_ROUTE,
  PROFILE_ROUTE,
  SIGNUP_ROUTE,
} from "@constants/routes";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Areas, Notifications, Profile, Signup } from "./pages";

export const RouterAllRoutes = () => {
  const Home = lazy(() => import("@pages/Home/home.page"));
  const Login = lazy(() => import("@pages/Login/login.page"));

  return (
    <main>
      <Suspense>
        <Routes>
          <Route element={<Login />} path={LOGIN_ROUTE} />
          <Route element={<Signup />} path={SIGNUP_ROUTE} />
          <Route element={<Home />} path={HOME_ROUTE} />
          <Route element={<Areas />} path={AREAS_ROUTE} />
          <Route element={<Notifications />} path={NOTIFICATIONS_ROUTE} />
          <Route element={<Profile />} path={PROFILE_ROUTE} />
        </Routes>
      </Suspense>
    </main>
  );
};
