import Navbar from './components/Navbar';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import { CartProvider } from './context/CartContext';


import AdminPage from './components/AdminPage';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';

function App() {
  return (
<CartProvider>
     <div>
      <Navbar />
      <Routes>
         <Route path="/admin" element={<AdminPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
    </CartProvider>
  );
}

export default App;
