import Navbar from './components/Navbar';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import AuthCallback from './components/AuthCallback'; 
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Checkout from './components/Checkout';
import UserProfile from './components/UserProfile';


import AdminPage from './components/AdminPage';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';

function App() {
  return (
    <AuthProvider>
<CartProvider>
     <div>
      <Navbar />
      <Routes>
         <Route path="/admin" element={<AdminPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
