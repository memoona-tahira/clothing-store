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

  // Configure axios to send cookies with requests - UPDATED
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = API_BASE_URL;

  const checkAuth = async () => {
    try {
      console.log('🔍 Checking auth status...');
      const response = await axios.get('/auth/me');
      console.log('✅ Auth check success:', response.data.user?.email);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error("❌ Auth check failed:", error);
      setUser(null);
      return null;
    }
  };

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, []);

  const login = () => {
    // Redirect to backend Google OAuth
    const toUrl = `${API_BASE_URL}/auth/google`;
    console.log("🔗 Redirecting to:", toUrl);
    window.location.href = toUrl;
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      window.location.href = "/";
    }
  };

  const handleAuthCallback = async () => {
    console.log('🔄 Re-checking auth status after callback...');
    // Wait a bit for session to be fully established
    await new Promise(resolve => setTimeout(resolve, 1500));
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