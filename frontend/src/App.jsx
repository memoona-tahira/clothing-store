import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import AuthCallback from './components/AuthCallback'; 
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Checkout from './components/Checkout';
import UserProfile from './components/UserProfile';
import InstallPrompt from './components/InstallPrompt';
import AdminPage from './components/AdminPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';

// Inside your App component or create a wrapper
function AuthHandler({ children }) {
  const { handleAuthCallback } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = urlParams.get('auth_success');
    
    if (authSuccess === 'true') {
      console.log('🔄 Handling auth success...');
      handleAuthCallback();
      // Clean the URL
      window.history.replaceState({}, '', '/');
    }
  }, [handleAuthCallback]);

  return children;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
          <AuthHandler>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            {/* Updated to match backend redirect */}
            <Route path="/auth/google/callback" element={<AuthCallback />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<UserProfile />} />
            {/* Redirect for old URL */}
            <Route path="/auth/callback" element={<Navigate to="/auth/google/callback" replace />} />
          </Routes>
          <Footer />
          <InstallPrompt />
        </div>
        </AuthHandler>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;