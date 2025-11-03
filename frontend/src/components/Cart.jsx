import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="cart-continue-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cartItems.map((item, index) => (
        <div
          key={`${item.productId}-${item.size}-${item.color}-${index}`}
          className="cart-item"
        >
          <img
            src={item.image}
            alt={item.name}
            className="cart-item-image"
          />

          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Size: {item.size} | Color: {item.color}</p>
            <p style={{ fontWeight: 'bold' }}>{item.price} kr</p>
          </div>

          <div className="cart-quantity-controls">
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
              className="cart-quantity-btn"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
              className="cart-quantity-btn"
            >
              +
            </button>
          </div>

          <p className="cart-item-price">
            {item.price * item.quantity} kr
          </p>

          <button
            onClick={() => removeFromCart(item.productId, item.size, item.color)}
            className="cart-remove-btn"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-total">
        <h2>Total: {getCartTotal()} kr</h2>
        <div className="cart-actions">
          <button onClick={clearCart} className="cart-clear-btn">
            Clear Cart
          </button>
          <button onClick={() => navigate('/checkout')} className="cart-checkout-btn">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;