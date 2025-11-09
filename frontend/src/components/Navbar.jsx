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
        <Link to="/">Home</Link>
        <Link to="/products?cat=Men">Men</Link>
        <Link to="/products?cat=Women">Women</Link>
        <Link to="/products?cat=Kids">Kids</Link>
        {isAdmin && <Link to="/admin">Admin</Link>}
      </div>

      {/* Center - Logo/Brand */}
      <div className="nav-center">
        <Link
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          FASHION
        </Link>
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
            <svg
              className="lx-icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M3.11846 19.7328C3.91475 16.1495 7.09297 13.6 10.7637 13.6H13.2363C16.907 13.6 20.0852 16.1495 20.8815 19.7328C21.0717 20.5884 20.4206 21.4 19.5441 21.4H4.45587C3.57939 21.4 2.92833 20.5884 3.11846 19.7328Z"
                strokeWidth="1.2"
              />
              <circle cx="12" cy="7" r="4.4" strokeWidth="1.2" />
            </svg>
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
