import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  // ⛔ WAIT until auth check completes
  if (loading) {
    return <div>Loading...</div>; // or spinner
  }

  // ⛔ Only redirect AFTER loading is done
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;