import { Outlet, Route, Routes } from "react-router-dom";
import { RequireAuth } from "../components/RequireAuth";
import { WrappedNavbar } from "../components/WrappedNavbar";
import { ErrorPage } from "../pages/ErrorPage";
import { HomePage } from "../pages/Home";
import { Login } from "../pages/Login";
import { MyMemes } from "../pages/MyMemes";
import { SearchPage } from "../pages/SearchPage";
import { UploadMemePage } from "../pages/UploadMemePage";

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
          <Route element={<RequireAuth />}>
            <Route path="/upload" element={<UploadMemePage />} />
            <Route path="/my-memes" element={<MyMemes />} />
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
