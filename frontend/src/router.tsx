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
import {
  AlertProvider,
  AuthProvider,
  CurrentLocationProvider,
  MapValuesProvider,
  RoutingProvider,
} from "./contexts";
import { AuthRequired } from "./components";
import { AppLayout } from "./layouts";

export const RouterAllRoutes = () => {
  const Home = lazy(() => import("@pages/Home/home.page"));
  const Login = lazy(() => import("@pages/Login/login.page"));

  return (
    <div>
      <AlertProvider>
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
                          <AppLayout />
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
      </AlertProvider>
    </div>
  );
};
