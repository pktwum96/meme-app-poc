import { Outlet, Route, Routes } from "react-router-dom";
import { WrappedNavbar } from "../components/WrappedNavbar";
import { CreateMemePage } from "../pages/CreateMemePage";
import { EditMemePage } from "../pages/EditMemePage";
import { ErrorPage } from "../pages/ErrorPage";
import { HomePage } from "../pages/Home";
import { Login } from "../pages/Login";
import { MemeInfoPage } from "../pages/MemeInfo";
import { MyMemes } from "../pages/MyMemes";
import { RequestMemePage } from "../pages/RequestMemePage";
import { ReviewPage } from "../pages/ReviewPage";
import { SearchPage } from "../pages/SearchPage";
import { RequireAuth } from "./helpers/RequireAuth";
import { RequireModeratorPrivileges } from "./helpers/RequireModeratorPrivileges";

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
          <Route path="/meme/request" element={<RequestMemePage />} />

          <Route element={<RequireAuth />}>
            <Route path="/my-memes" element={<MyMemes />} />

            <Route path="/meme">
              <Route path="create" element={<CreateMemePage />} />
              <Route path=":memeId" element={<MemeInfoPage />} />
              <Route path=":memeId/edit" element={<EditMemePage />} />
              <Route path=":memeId/:slugId" element={<MemeInfoPage />} />
              <Route element={<RequireModeratorPrivileges />}>
                <Route path="review">
                  <Route index element={<ReviewPage />} />
                  <Route path=":memeId" element={<MemeInfoPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
