import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../supabase/useUser";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";

export const RequireAuth = () => {
  const { user, isLoading } = useUser();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  // If the user data is still loading, show a loading state or prevent redirecting prematurely
  if (isLoading) {
    return <div>Loading...</div>; // Add a loading indicator here if you prefer
  }

  // If user is null after loading, redirect to login page
  return user ? (
    <Box sx={{ display: "flex" }}>
      <NavBar open={open} setOpen={setOpen} />
      <SideBar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
