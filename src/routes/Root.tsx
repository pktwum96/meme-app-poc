import { Outlet, Route, Routes } from "react-router-dom";
import { WrappedNavbar } from "../components/WrappedNavbar";
import { ErrorPage } from "../pages/ErrorPage";
import { HomePage } from "../pages/Home";
import { Login } from "../pages/Login";
import { SearchPage } from "../pages/SearchPage";

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        <Route element={<WrappedNavbar />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
