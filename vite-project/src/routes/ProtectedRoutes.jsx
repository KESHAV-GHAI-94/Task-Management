import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoutes = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;