import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/user/me",
        {
    withCredentials: true,
    headers: { "Cache-Control": "no-cache" }
  },
      );
      setUser(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
      setUser(null);
    } else {
      console.error("Error fetching user:", err);
    }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/user/logout",
        {},
         {
    withCredentials: true,
    headers: { "Cache-Control": "no-cache" }
  },
      );
      setUser(null);
    } catch (err) {
      console.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);