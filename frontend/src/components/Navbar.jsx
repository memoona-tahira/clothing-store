import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { getCartCount } = useCart();
  const { user, isAuthenticated, isAdmin, login, logout, loading } = useAuth();
  const cartCount = getCartCount();

  return (
    <nav>
      {/* Left side - Navigation links */}
      <div className="nav-left">
        <Link to="/products?cat=Men">Men</Link>
        <Link to="/products?cat=Women">Women</Link>
        <Link to="/products?cat=Kids">Kids</Link>
        {isAdmin && <Link to="/admin">Admin</Link>}
      </div>

      {/* Right side - User & Cart */}
      <div className="nav-right">
        {/* User section */}
        {loading ? (
          <span>Loading...</span>
        ) : isAuthenticated ? (
          <div className="user-info">
            <Link to={isAdmin ? "/admin" : "/profile"} className="user-link">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="user-avatar"
                />
              )}
              <span>{user.name}</span>
            </Link>
            {isAdmin && <span className="admin-badge">ADMIN</span>}
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={login} className="login-btn">
            <span>🔒</span>
            Sign in with Google
          </button>
        )}

        {/* Cart icon */}
        <Link to="/cart" className="cart-link">
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;