import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequireAuth({ allowedUsers }) {
  const { auth } = useAuth();
  console.log(auth, "auth userff");
  const location = useLocation();

  return allowedUsers?.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.length ? (
    <Navigate to="unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
