import {
  AREAS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  NOT_FOUND_ROUTE,
  NOTIFICATIONS_ROUTE,
  PROFILE_ROUTE,
  SIGNUP_ROUTE,
} from "@constants/routes";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  Areas,
  Logout,
  Notifications,
  Profile,
  Signup,
  NotFound,
} from "./pages";
import MenuLayout from "./layouts/MenuLayout/menuLayout.layout";
import { AuthProvider } from "@contexts/AuthProvider";
import { AuthRequired } from "@components/AuthRequired/authRequired.component";
import { CurrentLocationProvider } from "@contexts/CurrentLocationProvider";
import { MapValuesProvider } from "@contexts/MapValuesProvider";
import { RoutingProvider } from "./contexts/RoutingProvider";

export const RouterAllRoutes = () => {
  const Home = lazy(() => import("@pages/Home/home.page"));
  const Login = lazy(() => import("@pages/Login/login.page"));

  return (
    <div>
      <RoutingProvider>
        <CurrentLocationProvider>
          <MapValuesProvider>
            <AuthProvider>
              <Suspense>
                <Routes>
                  <Route element={<Login />} path={LOGIN_ROUTE} />
                  <Route element={<Logout />} path={LOGOUT_ROUTE} />
                  <Route element={<Signup />} path={SIGNUP_ROUTE} />

                  <Route
                    element={
                      <AuthRequired>
                        <MenuLayout />
                      </AuthRequired>
                    }
                  >
                    <Route element={<Home />} path={HOME_ROUTE} />
                    <Route element={<Areas />} path={AREAS_ROUTE} />
                    <Route
                      element={<Notifications />}
                      path={NOTIFICATIONS_ROUTE}
                    />
                    <Route element={<Profile />} path={PROFILE_ROUTE} />
                  </Route>

                  <Route element={<NotFound />} path={NOT_FOUND_ROUTE} />
                  <Route
                    element={<Navigate to={NOT_FOUND_ROUTE} />}
                    path={"*"}
                  />
                </Routes>
              </Suspense>
            </AuthProvider>
          </MapValuesProvider>
        </CurrentLocationProvider>
      </RoutingProvider>
    </div>
  );
};
