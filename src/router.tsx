import { MAP_ROUTE } from "@constants/routes";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Importação dinâmica dos componentes
const Map = lazy(() => import("@pages/Home/home.page"));
const Login = lazy(() => import("@pages/LoginPage/Login.page")); // Adicione o caminho do login

export const RouterAllRoutes = () => {
  return (
    <main>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path={MAP_ROUTE} element={<Map />} />
          <Route path="/login" element={<Login />} /> {/* Nova rota de login */}
        </Routes>
      </Suspense>
    </main>
  );
};
