import { createContext, useState, useEffect, useContext } from "react";
import Api from "../Api";
export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return;
  }
    try {
      const res = await Api.get("/user/me",{
        headers: {
        "Cache-Control": "no-cache"
      }
    });
      setUser(res.data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
