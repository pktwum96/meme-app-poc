import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isReviewer } from "../../helpers/utils";
import { useUser } from "../../supabase/useUser";

export const RequireModeratorPrivileges = () => {
  const { userDetails, isLoading } = useUser();

  const location = useLocation();
  // If the user data is still loading, show a loading state or prevent redirecting prematurely
  if (isLoading || !userDetails) {
    return <div>Loading...</div>; // Add a loading indicator here if you prefer
  }

  return isReviewer(userDetails) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
