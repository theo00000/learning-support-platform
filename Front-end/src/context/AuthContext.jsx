import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem("learning_user");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    localStorage.removeItem("learning_user");
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(() =>
    localStorage.getItem("learning_token"),
  );
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const isAuthenticated = Boolean(token && user);

  const saveSession = ({ token: newToken, user: newUser }) => {
    localStorage.setItem("learning_token", newToken);
    localStorage.setItem("learning_user", JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  };

  const clearSession = () => {
    localStorage.removeItem("learning_token");
    localStorage.removeItem("learning_user");

    setToken(null);
    setUser(null);
  };

  const register = async (payload) => {
    const response = await api.post("/auth/register", payload);
    saveSession(response.data);
    return response.data;
  };

  const login = async (payload) => {
    const response = await api.post("/auth/login", payload);
    saveSession(response.data);
    return response.data;
  };

  const logout = () => {
    clearSession();
  };

  const refreshProfile = async () => {
    const response = await api.get("/auth/me");
    const freshUser = response.data.user;

    localStorage.setItem("learning_user", JSON.stringify(freshUser));
    setUser(freshUser);

    return freshUser;
  };

  useEffect(() => {
    const checkSession = async () => {
      if (!token) {
        setIsCheckingSession(false);
        return;
      }

      try {
        await refreshProfile();
      } catch {
        clearSession();
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isCheckingSession,
      register,
      login,
      logout,
      refreshProfile,
    }),
    [user, token, isAuthenticated, isCheckingSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
