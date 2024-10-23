import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../../supabase/user-provider";

export const RequireAuth = () => {
  const { user, isLoading } = useUser();
  const location = useLocation();
  // If the user data is still loading, show a loading state or prevent redirecting prematurely
  if (isLoading) {
    return <div>Loading...</div>; // Add a loading indicator here if you prefer
  }

  // If user is null after loading, redirect to login page
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
