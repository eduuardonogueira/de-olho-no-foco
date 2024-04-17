import { MAP_ROUTE } from "@constants/routes"
import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

export const RouterAllRoutes = () => {
  const Map = lazy(() => import("@pages/Home/home.page"))

  return (
    <main>
      <Suspense>
        <Routes>
          <Route element={<Map />} path={MAP_ROUTE}/>
        </Routes>
      </Suspense>
    </main>
  )
}
