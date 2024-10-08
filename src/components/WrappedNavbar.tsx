import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export const WrappedNavbar = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
