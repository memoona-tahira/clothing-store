import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import ProductsList from "./admin/ProductsList";
import StockManagement from "./admin/StockManagement";
import OrdersManagement from "./admin/OrdersManagement";

function AdminPage() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  if (loading) {
    return (
      <div className="admin-loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-auth-required">
        <h2>⚠️ Authentication Required</h2>
        <p>Please sign in to access the admin page.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-access-denied">
        <h2>Access Denied</h2>
        <p>You do not have admin privileges.</p>
        <Navigate to="/products?cat=Men" replace />
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>👑 Admin Dashboard</h1>
      
      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab('products')}
          className={`admin-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
        >
          📦 Products
        </button>
        <button
          onClick={() => setActiveTab('stock')}
          className={`admin-tab-btn ${activeTab === 'stock' ? 'active' : ''}`}
        >
          📊 Stock
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
        >
          🛍️ Orders
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'products' && <ProductsList />}
      {activeTab === 'stock' && <StockManagement />}
      {activeTab === 'orders' && <OrdersManagement />}
    </div>
  );
}

export default AdminPage;