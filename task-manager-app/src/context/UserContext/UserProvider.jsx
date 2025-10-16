import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { authService } from "../../services/authService";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [globalSearch, setGlobalSearch] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(true);

  const [formDataCache, setFormDataCache] = useState(() => {
    try {
      const saved = localStorage.getItem("formData");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Ошибка при чтении кэша формы из localStorage:", error);
    }
    return {
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      tags: [],
      subtasks: [],
    };
  });

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      setUser(authService.getUser());
    }

    const savedSearchEnabled = localStorage.getItem("searchEnabled");
    if (savedSearchEnabled !== null) {
      setSearchEnabled(JSON.parse(savedSearchEnabled));
    }

    setIsLoading(false);
  }, []);

  const setSearchEnabledWithSave = (enabled) => {
    setSearchEnabled(enabled);
    localStorage.setItem("searchEnabled", JSON.stringify(enabled));
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    globalSearch,
    setGlobalSearch,
    searchEnabled,
    setSearchEnabled: setSearchEnabledWithSave,
    formDataCache,
    setFormDataCache,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
