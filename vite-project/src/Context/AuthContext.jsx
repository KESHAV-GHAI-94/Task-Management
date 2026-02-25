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
    try {
      const res = await Api.get("/user/me", {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      setUser(res.data);
    } catch {
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
