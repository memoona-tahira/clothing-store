import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../config/api'; 

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create axios instance with JWT token
  const authAxios = axios.create({
    baseURL: API_BASE_URL,
  });

  // Add token to requests
  authAxios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.log('🔍 No token found');
        setUser(null);
        return null;
      }

      console.log('🔍 Checking auth status with token...');
      const response = await authAxios.get('/auth/me');
      console.log('✅ Auth check success:', response.data.user?.email);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error("❌ Auth check failed:", error);
      // If token is invalid, remove it
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
      }
      setUser(null);
      return null;
    }
  };

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, []);

  const login = () => {
    const toUrl = `${API_BASE_URL}/auth/google`;
    console.log("🔗 Redirecting to:", toUrl);
    window.location.href = toUrl;
  };


const logout = async () => {
  try {
    await authAxios.post('/auth/logout');
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem('authToken');
    setUser(null);
    // FIX: Redirect to root instead of /products?cat=Men
    window.location.href = "/";
  }
};

  const handleAuthCallback = async () => {
    console.log('🔄 Re-checking auth status after callback...');
    const user = await checkAuth();
    return user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        handleAuthCallback,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};