import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center" 
    }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/products?cat=Men">Men</Link>
        <Link to="/products?cat=Women">Women</Link>
        <Link to="/products?cat=Kids">Kids</Link>
        <Link to="/admin">Admin</Link>
      </div>

      <Link
        to="/cart"
        style={{
          position: "relative",
          color: "white",
          textDecoration: "none",
          fontSize: "1.5rem",
        }}
      >
        🛒
        {cartCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "1px 4px",
              fontSize: "0.6rem",
              fontWeight: "bold",
              minWidth: "16px",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: "1",
            }}
          >
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
}
export default Navbar;