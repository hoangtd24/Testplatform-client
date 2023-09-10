import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const PrivateOutLet = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  //   return children;
};

export default PrivateOutLet;
