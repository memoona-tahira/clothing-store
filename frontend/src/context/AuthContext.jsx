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

  // Configure axios to send cookies with requests
  axios.defaults.withCredentials = true;

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Checking initial auth status...');
        const response = await axios.get(`${API_BASE_URL}/auth/me`);
        console.log('✅ Initial auth check success:', response.data.user?.email);
        setUser(response.data.user);
      } catch (error) {
        console.error("❌ Initial auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => {
    // Redirect to backend Google OAuth
    const toUrl = `${API_BASE_URL}/auth/google`;
    console.log("🔗 Redirecting to:", toUrl);
    window.location.href = toUrl;
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      window.location.href = "/products?cat=Men";
    }
  };

  const handleAuthCallback = async () => {
    // Re-check auth status after callback
    console.log('🔄 Re-checking auth status after callback...');
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`);
      console.log('✅ Post-callback auth success:', response.data.user?.email);
      setUser(response.data.user);
    } catch (error) {
      console.error("❌ Post-callback auth check failed:", error);
      setUser(null);
    }
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