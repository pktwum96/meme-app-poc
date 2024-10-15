import { Outlet, Route, Routes } from "react-router-dom";
import { RequireAuth } from "../components/RequireAuth";
import { WrappedNavbar } from "../components/WrappedNavbar";
import { CreatePage } from "../pages/CreatePage";
import { ErrorPage } from "../pages/ErrorPage";
import { HomePage } from "../pages/Home";
import { Login } from "../pages/Login";
import { MemeInfoPage } from "../pages/MemeInfo";
import { MyMemes } from "../pages/MyMemes";
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
          <Route element={<RequireAuth />}>
            <Route path="/my-memes" element={<MyMemes />} />

            <Route path="/meme">
              <Route path="create" element={<CreatePage />} />
              <Route path=":memeId" element={<MemeInfoPage />} />
            </Route>
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
