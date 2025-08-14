import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);


  const getUserFromToken = (token) => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role 
      };
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getUserFromToken(token));

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(getUserFromToken(newToken))
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null)
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
