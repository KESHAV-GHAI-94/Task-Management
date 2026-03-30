import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom"; // ⭐ ADD THIS
import Api from "../Api";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation(); // ⭐ ADD THIS

  const fetchUser = async () => {
    try {
      const res = await Api.get("/user/me");
      setUser(res.data);
    } catch (err) {
      console.error("Fetch user error:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const publicRoutes = ["/login", "/signup"];

    // 🚫 Skip API call on login/signup OR no token
    if (!token || publicRoutes.includes(location.pathname)) {
      setLoading(false);
      return;
    }

    fetchUser();
  }, [location.pathname]); // ⭐ IMPORTANT

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};